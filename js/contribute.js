quantity = "";
fund = "";

// real plans tho
bci = "plan_FXsqP4qLGnFQjX";
extend = "plan_FXssnU7TEOK37g";
var stripe = Stripe('pk_live_mfV8c96dxDFhaoLklXv95jXQ00sJQsEgi0');

// test plans boo
/*
bci = "plan_FXeWjim5Px1vpb";
extend = "plan_FZ6j9NnlYSRHOy";
var stripe = Stripe('pk_test_RaHBGeycEJdiCKknKNRnUli200I87DPVwB');
*/

var checkoutButtons = document.querySelectorAll('.tier-card-submit');
console.log(checkoutButtons);

for (const butt of checkoutButtons) {
  butt.addEventListener('click', function () {
    quantity = this.id.split("_").slice(-1)[0];
    if (fund == "") {
        console.log("need to select a fund, how'd you even get here?");
        return;
    }
    
    if (fund == bci) {
        plan = "bci";
    } else {
        plan = "life";
    }

    analytics.track("Clicked donate " + quantity + " " + plan, {
        plan: quantity,
        accountType: plan 
    });

    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
        items: [{plan: fund, quantity: parseInt(quantity)}],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: window.location.protocol + '//axitelabs.com/success.html',
        cancelUrl: window.location.protocol + '//axitelabs.com',
    })
    .then(function (result) {
        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            console.log(result.error.message);
        }
    });
  });
}

$(".tier-card-submit").click(function(){
    quantity = $(this).attr('id').split("_").slice(-1)[0];
    console.log(quantity);
    $(this).parent().parent(".tier-card").siblings(".tier-card").removeClass("tier-card-selected");
    $(this).parent().parent(".tier-card").addClass("tier-card-selected");
});
