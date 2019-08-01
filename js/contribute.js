//var stripe = Stripe('pk_test_RaHBGeycEJdiCKknKNRnUli200I87DPVwB');
var stripe = Stripe('pk_live_mfV8c96dxDFhaoLklXv95jXQ00sJQsEgi0');

quantity = ""
fund = ""

bci = "plan_FXsqP4qLGnFQjX"
extend = "plan_FXssnU7TEOK37g"

var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function () {

  if (quantity == "" || fund == "") {
    return;
  }

  analytics.track("Clicked Donate", {
    plan: quantity,
    accountType: fund
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
    successUrl: window.location.protocol + '//scienceisgood.github.io',
    cancelUrl: window.location.protocol + '//scienceisgood.github.io',
  })
  .then(function (result) {
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer.
      console.log(result.error.message);
    }
  });
});

$(".select-this-fund").click(function(){
    if ($(this).hasClass("life-extension-card")) {
        fund = extend;
    } else {
        fund = bci;
    }

    $(this).parent("div").siblings().removeClass("research-card-selected");
    $(this).parent("div").siblings().addClass("research-card-not-selected");

    $(this).parent("div").removeClass("research-card-not-selected");
    $(this).parent("div").addClass("research-card-selected");
});

$(".contribution-tier-card").click(function(){
    quantity = $(this).attr('id').split("_").slice(-1)[0];
    console.log(quantity);
    $(this).removeClass("not-selected");
    $(this).addClass("card-selected");

    $(this).siblings().removeClass("card-selected");
    $(this).siblings().addClass("not-selected");
});

