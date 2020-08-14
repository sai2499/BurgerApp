import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
    const updatedState= {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedState(state,updatedState);
}
const removeIngredient = (state, action) => {
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]-1}
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            const updatedState= {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
                building: true
            }   
    return updatedState(state,updatedState);
}
const setIngredient = (state,action) => {
    return updateObject(state,{
        ingredients: action.ingredents,
        totalPrice: 4,
        error: false,
        building: false
    })
}
const fetchIngredientFail= (state,action) => {
    return updatedState(
        state,{
        error: true}
    )
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionType.ADD_INGREDIENT:
            return addIngredient(state,action);
            // const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1}
            // const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            // const updatedState= {
            //     ingredients: updatedIngredients,
            //     totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            // }
            // return {
            //     ...state,
            //     // ingredients: {
            //     //     ...state.ingredients,
            //     //     [action.ingredientName]:state.ingredients[action.ingredientName]+1
            //     // }
            //     ingredients: updatedIngredients,
            //     totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            // };  
            //return updatedState(state,updatedState);          
        case actionType.REMOVE_INGREDIENT:
            return removeIngredient(state,action);
            // const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]-1}
            // const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            // const updatedState= {
            //     ingredients: updatedIngredients,
            //     totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            // }               
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]:state.ingredients[action.ingredientName]-1
            //     },
            //     totalPrice: state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
            // };
            //return updatedState(state,updatedState);
        case actionType.SET_INGREDIENT:
            return setIngredient(state, action);
            // return updateObject(state,{
            //     ingredients: action.ingredents,
            //     totalPrice: 4,
            //     error: false
            // })
            // return {
            //     ...state,
            //     ingredients: action.ingredents,
            //     totalPrice: 4,
            //     error: false
            // };
        case actionType.FETCH_INGREDIENT_FAILED:
            return fetchIngredientFail(state,action);
            // return updatedState(
            //     state,{
            //     error: true}
            // )
        default:
            return state
    }
    

};

export default reducer;