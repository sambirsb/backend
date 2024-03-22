import mongoose from 'mongoose';
import { ProxyType } from '../constants/proxyType';
import ProxyModel from '../models/ProxyModel';
import CreatorModel from '../models/CreatorModel';
import userService from './UserService';
import creatorService from './CreatorService';
import publicDataService from '../servicesStat/PublicDataService';
import {
    addProxyZone,
    adminRoleCheck,
    checkIPWithProxy,
    generateRandomInt,
    getCountryCode,
    getCountryName,
    getMaxActiveZoneNumberFromBD,
    getProxyCreationData,
    getRandomEnabledRegionProxy,
    toAutoProxyResponseType,
    toZoneBDCreateType,
} from '../utils';
import { validateChooseHttpProxy } from '../validation/proxyValidation';
import { elevateError } from '../errors/elevateError';
import { ICreator, IProxy } from '../types';
import { IPublicData } from '../typesStat';
import {
    ChooseAutoProxyInput,
    ChooseHttpProxyInput,
    EnabledRegionProxy,
    UserDto,
} from '../generated/graphql';

class ProxyService {
    private model: typeof ProxyModel = ProxyModel;

    async getCreatorProxyExt(creatorId: string) {
        try {
            return (await this.model.findOne({
                creatorId,
            })) as IProxy;
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorProxyWithRemove(token: string, creatorId: string) {
        try {
            await this.validateUserAndCreator(token, creatorId);
            const existingProxy = (await this.model.findOne({
                creatorId,
            })) as IProxy;

            if (existingProxy) {
                await this.handleProxyBasedOnType(creatorId, existingProxy);
            }

            return existingProxy;
        } catch (err) {
            elevateError(err);
        }
    }

    async getCreatorProxy(token: string, creatorId: string) {
        try {
            await this.validateUserAndCreator(token, creatorId);

            return (await this.model.findOne({
                creatorId,
            })) as IProxy;
        } catch (err) {
            elevateError(err);
        }
    }

    async chooseHTTPProxy(token: string, data: ChooseHttpProxyInput) {
        try {
            await validateChooseHttpProxy(data);

            const { creatorId } = data;

            if (!creatorId) {
                throw new Error('CreatorId is required.');
            }

            await this.validateUserAndCreator(token, creatorId);

            const existingProxy = (await this.model.findOne({
                creatorId,
            })) as IProxy;
            await this.handleProxyBasedOnType(creatorId, existingProxy);

            return await this.model.create({
                ...data,
                proxyType: ProxyType.HTTP,
            });
        } catch (err) {
            elevateError(err);
        }
    }

    async chooseAUTOProxy(token: string, input: ChooseAutoProxyInput) {
        try {
            const user = await userService.getUserByToken(token);
            const { creatorId, country } = input;

            if (!creatorId || !country) {
                throw new Error('Country and CreatorId are required.');
            }

            const creator = (await creatorService.getCreatorById(
                creatorId
            )) as ICreator;

            if (creator.userId.toString() !== user.id) {
                throw new Error('You are not the creator of this creator.');
            }

            return await this.chooseAUTOProxyWithoutToken(creator.id, country);
        } catch (err) {
            elevateError(err);
        }
    }

    async chooseAUTOProxyDefault(creatorId: string) {
        try {
            let proxy: IProxy;

            const country =
                (await this.getAvailableCountryDefault()) as EnabledRegionProxy;

            console.log('Hello 1');

            if (!country) {
                proxy = (await this.createAndChooseAUTOProxyDefault(
                    creatorId
                )) as IProxy;
            } else {
                proxy = (await this.chooseAUTOProxyWithoutToken(
                    creatorId,
                    country
                )) as IProxy;
            }

            console.log('Hello 2');

            if (!proxy) {
                throw new Error('Proxy not found.');
            }

            return proxy;
        } catch (err) {
            elevateError(err);
        }
    }

    async addAUTOProxyByAdmin(token: string, country: EnabledRegionProxy) {
        try {
            await adminRoleCheck(token);

            return await this.addAutoProxyByCountry(country);
        } catch (err) {
            elevateError(err);
        }
    }

    async checkAutoProxyForCreatorsDefault(creatorIds: string[]) {
        try {
            for (const creatorId of creatorIds) {
                const proxy = (await ProxyModel.findOne({
                    creatorId: creatorId,
                })) as IProxy;

                if (!proxy) {
                    await this.chooseAUTOProxyDefault(creatorId);
                }
            }
        } catch (err) {
            elevateError(err);
        }
    }

    async deleteAUTOProxy(token: string, proxyId: string) {
        try {
            await adminRoleCheck(token);

            await this.model.deleteOne({ _id: proxyId });
        } catch (err) {
            elevateError(err);
        }
    }

    async getUserCreatorsProxyWithPublicData(
        token: string,
        statConnection: mongoose.Connection
    ) {
        try {
            const user = (await userService.getUserByToken(token)) as UserDto;

            const creators = (await CreatorModel.find({
                userId: user.id,
            })) as ICreator[];

            return await Promise.all(
                creators.map(async (creator) => {
                    const proxy = await ProxyModel.findOne({
                        creatorId: creator._id,
                    });
                    const pathId = creator.link.replace(
                        'https://onlyfans.com/',
                        ''
                    );
                    const authInfo = (await publicDataService.getPublicData(
                        pathId,
                        statConnection
                    )) as IPublicData;

                    return {
                        id: creator._id,
                        ...creator.toObject(),
                        proxy,
                        photoUrl: authInfo.avatarURL,
                        name: authInfo.userName,
                    };
                })
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async getUserCreatorsProxy(userId: string) {
        try {
            const creators = (await CreatorModel.find({
                userId,
            })) as ICreator[];

            return await Promise.all(
                creators.map(async (creator) => {
                    const proxy = (((await ProxyModel.findOne({
                        creatorId: creator._id,
                    })) as IProxy) || null) as IProxy;
                    return {
                        id: creator._id,
                        ...creator.toObject(),
                        proxy: toAutoProxyResponseType(proxy),
                    };
                })
            );
        } catch (err) {
            elevateError(err);
        }
    }

    async getProxyByOFUserId(user_id: string) {
        try {
            const creator = (await creatorService.getCreatorByAuthUser_Id(
                user_id
            )) as ICreator;

            return (await ProxyModel.findOne({
                creatorId: creator._id,
            })) as IProxy;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async getAvailableCountries() {
        try {
            const proxies = (await ProxyModel.find({
                proxyType: 'AUTO',
                $or: [{ creatorId: { $exists: false } }, { creatorId: null }],
            })) as IProxy[];

            type CountryMap = Record<string, number>;

            const countryMap: CountryMap = proxies.reduce<CountryMap>(
                (acc, proxy) => {
                    try {
                        const country = proxy.zone?.country || '';
                        const countryKey = getCountryName(country);

                        acc[countryKey] = (acc[countryKey] || 0) + 1;
                    } catch (error) {
                        console.error(error);
                        throw error;
                    }
                    return acc;
                },
                {}
            );

            return Object.entries(countryMap).map(([country, count]) => ({
                country,
                count,
            }));
        } catch (err) {
            elevateError(err);
        }
    }

    async getAvailableCountryDefault() {
        try {
            const countries = await this.getAvailableCountries();

            if (countries && countries.length > 0) {
                const numberOfCountry = generateRandomInt(countries.length);

                return countries[numberOfCountry].country;
            }

            return null;
        } catch (err) {
            elevateError(err);
        }
    }

    async createNextZoneNumber(country: string): Promise<number> {
        try {
            const countryCode = getCountryCode(country);
            const proxy = await ProxyModel.findOne({
                'zone.country': countryCode,
            })
                .sort({ 'zone.number': -1 })
                .exec();

            if (!proxy || !proxy.zone?.number) {
                return 1;
            }
            const maxProxyZoneNumber = Number(proxy.zone.number);

            const maxActiveZoneNumber =
                await getMaxActiveZoneNumberFromBD(countryCode);

            return Math.max(maxProxyZoneNumber, maxActiveZoneNumber) + 1;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async checkProxyIp(token: string, creatorId: string) {
        try {
            const existingProxy = (await this.getCreatorProxy(
                token,
                creatorId
            )) as IProxy;

            return await checkIPWithProxy(existingProxy);
        } catch (err) {
            elevateError(err);
        }
    }

    private async createAndChooseAUTOProxyDefault(creatorId: string) {
        try {
            const randomCountry = getRandomEnabledRegionProxy();
            const proxy = await this.addAutoProxyByCountry(randomCountry);

            if (!proxy) throw new Error('Proxy not found.');

            await this.model.deleteMany({
                creatorId,
                proxyType: { $in: ['HTTP'] },
            });

            proxy.creatorId = new mongoose.Types.ObjectId(creatorId);
            await proxy.save();

            return toAutoProxyResponseType(proxy);
        } catch (err) {
            elevateError(err);
        }
    }

    private async chooseAUTOProxyWithoutToken(
        creatorId: string,
        country: EnabledRegionProxy
    ) {
        try {
            await this.model.deleteMany({
                creatorId,
                proxyType: { $in: ['HTTP'] },
            });

            const countryCode = getCountryCode(country);

            const proxy = (await ProxyModel.findOne({
                'zone.country': countryCode,
                proxyType: ProxyType.AUTO,
                creatorId: undefined,
            })) as IProxy;

            if (!proxy) {
                throw new Error('No proxy found for this country.');
            }

            proxy.creatorId = new mongoose.Types.ObjectId(creatorId);
            await proxy.save();

            return toAutoProxyResponseType(proxy);
        } catch (err) {
            elevateError(err);
        }
    }

    private async addAutoProxyByCountry(country: EnabledRegionProxy) {
        try {
            const countryCode = getCountryCode(country);
            const nextActiveZoneNumber = (await this.createNextZoneNumber(
                country
            )) as number;

            const zoneName = `${countryCode}_${nextActiveZoneNumber}`;
            const addedZone = await addProxyZone(
                toZoneBDCreateType(zoneName, countryCode)
            );

            const autoProxyCreateData = getProxyCreationData(
                countryCode,
                nextActiveZoneNumber,
                zoneName,
                addedZone
            );

            return await this.model.create(autoProxyCreateData);
        } catch (err) {
            elevateError(err);
        }
    }

    private async validateUserAndCreator(userToken: string, creatorId: string) {
        const user = await userService.getUserByToken(userToken);
        const creator = (await creatorService.getCreatorById(
            creatorId
        )) as ICreator;

        if (creator.userId.toString() !== user.id) {
            throw new Error('You are not the creator of this creator.');
        }
    }

    private async handleProxyBasedOnType(
        creatorId: string,
        existingProxy: IProxy
    ) {
        if (existingProxy.proxyType.toString() === ProxyType.HTTP) {
            await this.model.deleteOne({ creatorId });
        }
        if (existingProxy.proxyType.toString() === ProxyType.AUTO) {
            await this.model.findByIdAndUpdate(existingProxy._id, {
                $unset: { creatorId: null },
            });
        }
    }
}
const proxyService = new ProxyService();
export default proxyService;
