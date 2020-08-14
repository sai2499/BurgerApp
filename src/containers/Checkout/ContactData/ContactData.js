import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
class ContactData extends Component {
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation: {
                    required: true  
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation: {
                    required: true  
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value:'',
                validation: {
                    required: true  
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation: {
                    required: true  
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value:'',
                validation: {
                    required: true  
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'input',
                elementConfig: {
                    option: [{value:'fatest', displayValue:'Fastest'},
                    {value:'cheapest', displayValue:'cheapest'}]
                },
                value:'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid:false
        //loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        //this.setState( { loading: true } );
        const formData={};
        for(let formElementId in this.state.orderForm) 
        {
            formData[formElementId] =this.state.orderForm[formElementId].value;
        } 
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId       
        }
        this.props.onOrderBurger(order,this.props.token)
        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false } );
        //         this.props.history.push('/');
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false } );
        //     } );
        this.props.orderBurger(order);
    }

    checkValidity(value,rules) {
        let isValid =false;
        if(rules.required) {
            isValid=value.trim() !=='' &&isValid;
        }
        return isValid;
        
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedOrderForm[inputId]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedOrderForm[inputId]=updatedFormElement;
        let formIsValid=true;
        for(let inputids in updatedOrderForm) {
            formIsValid=updatedOrderForm[inputids].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid});
    }

    render () {
        const formElements = [];
        for(let key in this.state.orderForm)
        {
            formElements.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElements.map(formElements => (
                        <Inupt 
                            invalid={!formElements.config.valid}
                            key={formElements.id}
                            elementType={formElements.config.elementType} 
                            elementConfig={formElements.config.elementConfig}
                            value={formElements.config.value}
                            shouldValidate={formElements.config.config.validation}
                            touched={formElements.config.touched}
                            changed={(event) => this.inputChangedHandler(event,formElements.id)}/>
                    ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        orderBurger:(orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));