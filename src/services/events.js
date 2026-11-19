const EventEmitter=require('events');
class AppEvents extends EventEmitter{}; const events=new AppEvents();
events.on('order-placed',order=>{console.log(`[EVENT] Order placed: ${order._id}`);});
events.on('stock-low',product=>{console.log(`[EVENT] Low stock: ${product.name} (${product.stock} left)`);});
module.exports=events;
