

// The localStorage option has some limitations both in the
// way that it treats values and in the way that it checks
// for existence. As such, this storageManager object will provide
// a better proxy.
function storageManager(storage){

  // Store the native storage reference as the object that
  // we are going to proxy. This object must uphold the
  // HTML5 Storage interface.
  this.storage = storage;
}


// Set up the class methods.
storageManager.prototype = {
  // I clear the storageManager.
  clear: function(){
    // Clear the storage container.
    this.storage.clear();
    // Return this object reference for method chaining.
    return( this );
  },

  // I get an item from the storageManager. If the item cannot be
  // found, I can pass back an optional default value.
  get: function(key){
    // Get the storageManagerd item.
    var value = this.storage.getItem(key);
    var currentTime = new Date().getTime()/1000;
    var expiration = this.storage.getItem(key + "timestamp");
    var timeStamp = this.storage.getItem(key + "expiry");
    var timeDifference = currentTime - timeStamp; 
    if (value === null){
      return undefined;
    } else {
      if (timeDifference < expiration)
      return (JSON.parse(value));
    }
  },

  // I remove the given item from the storageManager.
  remove: function(key){
    // Remove the key from the storage container.
    this.storage.removeItem( key );

    // Return this object reference for method chaining.
  },

  set: function( key, value, expiry ){
    this.storage.setItem(key, JSON.stringify(value));
    this.storage.setItem(key + "timestamp", new Date().getTime()/1000);
    this.storage.setItem(key + "expiry", expiry);
    // Return this object reference for method chaining.
  },

  setProperty: function(key, property, newValue, expiry) {
    var value = this.storage.getItem(key);
    if (value === null) {
      var newObj = {};
      newObj[property] = newValue;
      newObj = JSON.stringify(newObj);
      this.storage.setItem(key, newObj);
      this.storage.setItem(key + "timestamp", new Date().getTime()/1000);
      this.storage.setItem(key + "expiry", expiry);
      return;
    } else {
      var obj = JSON.parse(value);
      obj[property] = newValue;
      var obj = JSON.stringify(obj);
      this.storage.setItem(key, obj);
      this.storage.setItem(key + "timestamp", new Date().getTime()/1000);
      this.storage.setItem(key + "expiry", expiry);
    }
  }
};



// Now, let's create an instance of our new storageManager. When doing
// this, we're going to use localStorage as our storage
// container and the native JSON object as our serializer.
var storageManager = new storageManager(localStorage);

storageManager.set('clicksCounter', 7, 60);


// Check to see if a value exists.
var message = {'msg' : 'hello world!'};
storageManager.set('currMsg', message, 60*60*24);
var current = storageManager.get('currMsg');
console.log(current);

var numOfClicks = storageManager.get('clicksCounter');
console.log(numOfClicks);

storageManager.remove('clicksCounter');
var numOfClicks = storageManager.get('clicksCounter');
console.log(numOfClicks===undefined);



/* Example 1 : Object was already stored under the given key */

/* Saves an object under the key 'key1' with the attribute 'attr1' and the value 'value1'. Will be stored for 24 hours. */
storageManager.set('key1', {'attr1' : 'value1'}, 60*60*24); 
storageManager.setProperty('key1', 'attr2', 54, 60*60*24);
console.log(storageManager.get('key1'));


/* Example 2 : Nothing was stored under the given key */

/* Saves an object under the key 'key2' with the property 'attr3' and the value 13. Will be stored for 24 hours. */
storageManager.setProperty('key2', 'attr3', 13, 60*60*24);
storageManager.get('key2'); // Will return: { 'attr3' : 13 }
console.log(storageManager.get('key2'));




// Clear out any local storage items that have
// been populated from our experimenting.
storageManager.clear();

