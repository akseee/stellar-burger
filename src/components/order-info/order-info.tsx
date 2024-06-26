import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  getOrderData,
  orderActions,
  orderSelectors
} from '../../services/slices/order';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { getOrderSelector } = orderSelectors;
  const { getIngredientsSelector } = ingredientsSelectors;
  const { removeOrderData } = orderActions;

  const orderNum = useParams<'number'>().number;
  const orderData = useSelector(getOrderSelector);
  const ingredients = useSelector(getIngredientsSelector);

  useEffect(() => {
    if (Number(orderNum) !== orderData?.number) {
      dispatch(removeOrderData());
      dispatch(getOrderData(Number(orderNum)));
    }
  }, [dispatch, orderNum, orderData]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
