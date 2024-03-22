import { SumRevenues } from '../../typesStat';

export const getTextingRation = (sumRevenues: SumRevenues) => {
    return sumRevenues.subscribes !== 0
        ? parseFloat(
              (sumRevenues.chat_messages / sumRevenues.subscribes).toFixed(2)
          )
        : 0;
};
