class Home {
  constructor() {
  }

  run() {
    // Call function
    this.disableFormInput();
    this.getDataItem(null);
    this.whenAddMoneyClick();
    this.whenPurchaseClick();
    this.whenChangeReturnClick(null);
  }

  disableFormInput(){
    // Disable form input
    document.getElementById('total_money').disabled = true;
    document.getElementById('messages_purchase').disabled = true;
    document.getElementById('change_return').disabled = true;
    document.getElementById('item_id').disabled = true;
  }

  getDataItem(item_id){
    // Initiate variable
    var url = 'http://tsg-vending.herokuapp.com/items';
    var that = this;

    // Get item with ajax
    $.ajax({
      type: "GET",
      url: url,
      data: {},
      success: function (data) {
        let html = ``;
        // Set data to html
        for (let i = 0; i < data.length; i++){
          html += `
          <div class="col-sm-4 col-lg-4 mb-4">
            <div class="card h-100" id="`+ data[i].id +`">
              <div class="card-body">
                <p class="card-text">`+ data[i].id +`</p>
                <p class="card-title text-center">`+ data[i].name +`</p>
                <p class="card-text text-center">$`+ data[i].price +`</p>
                <p class="card-text text-center"><small>Quantity Left: `+ data[i].quantity +`</small></p>
              </div>
            </div>
          </div>
          `;
        }
        // Set item in variable html to container
        document.getElementById('item_container').innerHTML = html;

        // If item_id is not null, then set item
        if (item_id){
          let tmp = document.getElementById(''+item_id);
          tmp.className = tmp.className += " bg-primary text-white";
        }
        // Call function
        that.whenCardClick(data);
        that.whenChangeReturnClick(data);
      }
    });
  }

  whenCardClick(data){
    // Set condition for when click card
    for (let i = 0; i < data.length; i++){
      let tmp = document.getElementById(''+data[i].id);
      // Event for click card
      tmp.addEventListener('click', (event) => {
        // Check if card had a class bg-primary
        if (!tmp.classList.contains('bg-primary')){
          // Remove class from all card
          for (let j = 0; j < data.length; j++) {
            let remove_click = document.getElementById(''+data[j].id);
            remove_click.className = remove_click.className.replace(" bg-primary text-white", "");
          }
          // Set card
          tmp.className += " bg-primary text-white";
          document.getElementById('item_id').value = data[i].id;
        } else {
          // Set card
          tmp.className = tmp.className.replace(" bg-primary text-white", "");
          document.getElementById('item_id').value = '';
        }
      })
    }
  }

  whenAddMoneyClick(){
    // Button for add money
    let dollar = document.getElementById('dollar');
    let quarter = document.getElementById('quarter');
    let dime = document.getElementById('dime');
    let nickel = document.getElementById('nickel');

    // Event for when click button
    dollar.addEventListener('click', (event) => {
      add(1);
    })
    quarter.addEventListener('click', (event) => {
      add(0.25);
    })
    dime.addEventListener('click', (event) => {
      add(0.10);
    })
    nickel.addEventListener('click', (event) => {
      add(0.05);
    })

    // Add money to form
    var total_money = document.getElementById('total_money');
    function add(money){
      if (total_money.value == ''){
        total_money.value = money;
      } else {
        total_money.value = (parseFloat(total_money.value) + money).toFixed(2);
      }
    }
  }

  whenPurchaseClick(){
    // Initiate variable
    let btn_make_purchase = document.getElementById('btn_make_purchase');
    let item_id = document.getElementById('item_id');
    let messages_purchase = document.getElementById('messages_purchase');
    var that = this;

    // Event when click button
    btn_make_purchase.addEventListener('click', (event) => {
      // Condition for when no item clicked
      if (item_id.value != ''){
        // Call function post
        postPurchase();
      } else {
        // Set message
        messages_purchase.value = 'Please make a selection';
      }
    });

    function postPurchase(){
      // Initiate variable and link
      let money = document.getElementById('total_money').value;
      let item_id = document.getElementById('item_id').value;
      var url = 'http://tsg-vending.herokuapp.com/money/'+money+'/item/'+item_id;
      var messages_purchase = document.getElementById('messages_purchase');

      // Post item with ajax
      $.ajax({
        type: "POST",
        url: url,
        data: {},
        success: function (data) {
          // Set message
          messages_purchase.value = 'Thank You!!!';
          let total_money = document.getElementById('total_money');
          let change_return = document.getElementById('change_return');
          let txt_return_money = '';
          let return_money = 0.0;

          // Count return money
          if (data.quarters > 0){
            txt_return_money += data.quarters + ' Quarter';
            return_money += data.quarters * 0.25;
          }
          if (data.dimes > 0){
            if (txt_return_money != ''){
              txt_return_money += ' ';
            }
            txt_return_money += data.dimes + ' Dime';
            return_money += data.dimes * 0.10;
          }
          if (data.nickels > 0){
            if (txt_return_money != ''){
              txt_return_money += ' ';
            }
            txt_return_money += data.nickels + ' Nickel';
            return_money += data.nickels * 0.05;
          }
          if (data.pennies > 0){
            if (txt_return_money != ''){
              txt_return_money += ' ';
            }
            txt_return_money += data.pennies + ' Pennies';
            return_money += data.pennies * 0.01;
          }

          // Set return money
          total_money.value = (return_money).toFixed(2);
          change_return.value = txt_return_money;

          // Call function for update item
          that.getDataItem(document.getElementById('item_id').value);
        },
        error: function (result) {
          let message = JSON.parse(result.responseText);
          let change_return = document.getElementById('change_return');

          // Set message
          messages_purchase.value = message.message;
          change_return.value = '';

          // Call function for update item
          that.getDataItem(document.getElementById('item_id').value);
        }
      });
    }
  }

  whenChangeReturnClick(data){
    // When button change return click
    let btn_change_return = document.getElementById('btn_change_return');
    btn_change_return.addEventListener('click', (event) => {
      let total_money = document.getElementById('total_money');
      let messages_purchase = document.getElementById('messages_purchase');
      let item_id = document.getElementById('item_id');
      let change_return = document.getElementById('change_return');

      // Set form input
      total_money.value = '0.00';
      messages_purchase.value = '';
      item_id.value = '';
      change_return.value = '';

      // Clear item clicked
      if (data){
        for (let j = 0; j < data.length; j++) {
          let remove_click = document.getElementById(''+data[j].id);
          remove_click.className = remove_click.className.replace(" bg-primary text-white", "");
        }
      }
    });
  }

}



let home = new Home();
home.run();