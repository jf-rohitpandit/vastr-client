import axios from 'axios'
import {
  ORDER_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_POST_FAIL,
  ORDER_POST_REQUEST,
  ORDER_POST_SUCCESS,
  ORDER_DECREMENT_FAIL,
  ORDER_DECREMENT_REQUEST,
  ORDER_DECREMENT_SUCCESS,
  ORDER_INCREMENT_FAIL,
  ORDER_INCREMENT_REQUEST,
  ORDER_INCREMENT_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  PAYMENT_SUCCESSFUL,
} from '../constants/orderConstant'

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_GET_REQUEST })

    //axios request
    const result = await axios.get('https://vastr.herokuapp.com/order')

    dispatch({ type: ORDER_GET_SUCCESS, payload: result.data.orderList })
  } catch (error) {
    console.log(error)
    dispatch({ type: ORDER_GET_FAIL })
  }
}

export const addToOrders = (product) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_POST_REQUEST })
    console.log('Action', product)

    product.quantity = 1

    //axios request
    const result = await axios.post('https://vastr.herokuapp.com/order', {
      product,
    })

    dispatch({ type: ORDER_POST_SUCCESS, payload: result.data.orderList })
  } catch (error) {
    console.log(error)
    dispatch({ type: ORDER_POST_FAIL })
  }
}

export const incrementOrder = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_INCREMENT_REQUEST })

    const result = await axios.post(
      `https://vastr.herokuapp.com/order/increment/${productId}`,
    )
    console.log(result.data.orderList)

    dispatch({
      type: ORDER_INCREMENT_SUCCESS,
      payload: result.data.orderList,
    })
  } catch (error) {
    console.log(error)
    dispatch({ type: ORDER_INCREMENT_FAIL })
  }
}

export const decrementOrder = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DECREMENT_REQUEST })

    const result = await axios.post(
      `https://vastr.herokuapp.com/order/decrement/${productId}`,
    )
    console.log(result.data.orderList)
    dispatch({
      type: ORDER_DECREMENT_SUCCESS,
      payload: result.data.orderList,
    })
  } catch (error) {
    console.log(error)
    dispatch({ type: ORDER_DECREMENT_FAIL })
  }
}

export const deleteOrder = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST })

    const result = await axios.delete(
      `https://vastr.herokuapp.com/order/${productId}`,
    )
    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: result.data.orderList,
    })
  } catch (error) {
    console.log(error)

    dispatch({ type: ORDER_DELETE_FAIL })
  }
}

export const paymentSuccess = () => async (dispatch) => {
  try {
    await axios.patch(`https://vastr.herokuapp.com/order/paymentSuccess`)
    dispatch({ type: PAYMENT_SUCCESSFUL })
  } catch (error) {
    console.log(error)
  }
}
