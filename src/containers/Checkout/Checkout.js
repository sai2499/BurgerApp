import React, {Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {

    // componentWillMount () {
    //     this.props.onInitPurchase()
    // }
    // state ={
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients= {};
    //     let price=0;
    //     for (let param of query.entries())
    //     {
    //         if(param[0] === 'price')
    //         {
    //             price=param[1];
    //         }
    //         else
    //         {
    //             ingredients[param[0]]= +param[1]
    //         }            
    //     }
    //     this.setState({ingredients:ingredients,price: price})
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const summary=<Redirect to='/' />        
        if(this.props.ing) {
            const purchasedRedirect= this.props.purchased ? <Redirect to="/"></Redirect>: null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path+ '/contact-data'} 
                    /*render={(props) => (<ContactData 
                        ingredients={this.props.ingredients}
                    price={this.state.price}/>)*/
                    //component={ContactData} 
                    />
                </div>
                
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.PURCHASE_INIT)
//     }
// }

export default connect(mapStateToProps)(Checkout);