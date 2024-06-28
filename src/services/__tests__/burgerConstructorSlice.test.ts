import { expect, test, describe } from '@jest/globals';
import {
  TInitialState,
  burgerConstructorActions,
  burgerConstructorReducer
} from '../slices/burgerConstructor';

const mockBun = {
  name: 'Булка 1',
  _id: '1',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const mockIngredient1 = {
  name: 'Ингредиент 1',
  _id: '2',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const mockIngredient2 = {
  name: 'Ингредиент 2',
  _id: '3',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const mockIngredient3 = {
  name: 'Ингредиент 3',
  _id: '4',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

const mockId = expect.any(String);

describe('Проверяем редьюсеры слайса burgerConstructor:', () => {
  const initialState: TInitialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };
  test('[Тест 1] removeIngredient: обработка экшена удаления ингредиента', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [{ ...mockIngredient1, id: '1' }]
      }
    };

    const { removeIngredient } = burgerConstructorActions;

    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(0)
    );

    const { ingredients } = newState.constructorItems;

    expect(ingredients).toEqual([]);
  });
  describe('Обработка экшена добавления ингредиентов', () => {
    test('[Тест 2] addIngredient: добавления булки', () => {
      const { addIngredient } = burgerConstructorActions;
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(mockBun)
      );
      const { bun } = newState.constructorItems;

      expect(bun).toEqual({
        ...mockBun,
        id: mockId
      });
    });

    test('[Тест 3] addIngredient: добавления начинки/соуса', () => {
      const { addIngredient } = burgerConstructorActions;
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient1)
      );
      const { ingredients } = newState.constructorItems;

      expect(ingredients[0]).toEqual({
        ...mockIngredient1,
        id: mockId
      });
    });
  });

  describe('Проверяем обработку экшена изменения порядка ингредиентов в начинке', () => {
    const initialState: TInitialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockIngredient1, id: '1' },
          { ...mockIngredient2, id: '2' },
          { ...mockIngredient3, id: '3' }
        ]
      }
    };

    const resultState = {
      bun: null,
      ingredients: [
        { ...mockIngredient2, id: '2' },
        { ...mockIngredient1, id: '1' },
        { ...mockIngredient3, id: '3' }
      ]
    };
    test('[Тест 4] moveIngredientUp: изменения порядка верх', () => {
      const { moveIngredientUp } = burgerConstructorActions;
      const newState = burgerConstructorReducer(
        initialState,
        moveIngredientUp(1)
      );
      expect(newState.constructorItems).toEqual(resultState);
    });

    test('[Тест 5] moveIngredientDown: изменения порядка вниз', () => {
      const { moveIngredientDown } = burgerConstructorActions;
      const newState = burgerConstructorReducer(
        initialState,
        moveIngredientDown(0)
      );
      expect(newState.constructorItems).toEqual(resultState);
    });
  });

  // test('[Первый тест] ', () => {});
});