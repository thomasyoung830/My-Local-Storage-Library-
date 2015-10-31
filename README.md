# My-Local-Storage-Library-
Storage manager library that allows a user to store and retrieve local data persistently (also after page refresh). Data will be managed inside using localStorage.

Global scope

The following function is defined on the global window scope
StorageManager()
Creates an instances of the storage manager.
Examples:


/* Creates a local storage instance - this is what you need to implement in this exercise */
storageManager = StorageManager();
Storage manager class

The following functions need to be defined in the storage manager class
set( key , value, expiry )
Sets the given value under the given key for given expiry seconds.
Examples:


/* Sets the value 7 under the key 'clicksCounter' for 60 seconds. */
storageManager.set('clicksCounter', 7, 60);

/* Stores the object referenced by 'message' under the key 'curMsg' for 24 hours. */
var message = {'msg' : 'hello world!'};
storageManager.set('currMsg', message, 60*60*24);
get( key )
Returns the value stored under the given key. Returns undefined if it doesn't exist.
Examples:


/* Will output to the console the value that was stored under the 'clicksCounter' key (if it isn't expired). */
var numOfClicks = storageManager.get('clicksCounter');
console.log(numOfClicks);
remove( key )
Removes the value that is stored under the given key
Examples:


/* Will output true to the console. */
storageManager.remove('clicksCounter');
var numOfClicks = storageManager.get('clicksCounter');
console.log(numOfClicks===undefined);
setProperty( key , property, value, expiry )
Depends what is stored under the given key:
In case it is an object - add the given property with the given value to it. Expiry is updated to the given expiry value.
In case nothing is stored - create an object with the given property and the value to it. Expiry is updated to the given expiry value.
In case it is not an object - throw an exception.
In case it is an array - no need to handle this case
Examples:


/* Example 1 : Object was already stored under the given key */

/* Saves an object under the key 'key1' with the attribute 'attr1' and the value 'value1'. Will be stored for 24 hours. */
storageManager.set('key1', {'attr1' : 'value1'}, 60*60*24); 

/* Adds the property 'attr2' with the value 54 to the object stored under the key 'key1'. Will update expiry to 24 hours. */
storageManager.setProperty('key1', 'attr2', 54, 60*60*24);

storageManager.get('key1'); // Will return: { 'attr1' : 'value1', 'attr2' : 54 }

/* Example 2 : Nothing was stored under the given key */

/* Saves an object under the key 'key2' with the property 'attr3' and the value 13. Will be stored for 24 hours. */
storageManager.setProperty('key2', 'attr3', 13, 60*60*24);

storageManager.get('key2'); // Will return: { 'attr3' : 13 }

/* Example 3 : Non object was already stored under the given key (i.e. string, int ...) */

/* Saves the string 'my string' under the key 'key3'. Will be stored for 24 hours. */
storageManager.set('key3', 'my string', 60*60*24); 

/* Adds the property 'attr4' with the value 37 to the object stored under the key 'key3'. Will cause an exception */
storageManager.setProperty('key3', 'attr4', 37, 60*60*24); // An exception is thrown




