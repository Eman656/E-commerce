class Order{
    constructor(id, user_id, item_id, quantity, order_date, deliver_date, status, total_price) {
        this.id = id;
        this.user_id = user_id;
        this.item_id = item_id;
        this.quantity = quantity;
        this.order_date = order_date;
        this.deliver_date = deliver_date;
        this.status = status;
        this.total_price = total_price;
      }
}
module.exports = Order;