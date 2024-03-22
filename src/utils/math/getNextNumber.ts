import { Model, Document, Types } from 'mongoose';

export async function getNextNumber<T extends Document>(
    model: Model<T>,
    filterField: keyof T,
    filterValue: unknown,
    targetField: keyof T
): Promise<number> {
    const query: Record<string, unknown> = {};
    query[filterField as string] = new Types.ObjectId(filterValue as string);

    const result = await model
        .findOne(query)
        .sort({ [targetField as string]: -1 } as Record<string, 1 | -1>)
        .exec();
    const currentMaxNumber = result
        ? (result.get(targetField as string) as number)
        : 0;

    return currentMaxNumber + 1;
}
