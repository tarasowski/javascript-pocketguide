# Rule of Thumb

* Listen to a method = use Spy
	
* Replace a method body = use Stub
	+ if there is only 1 method you want to fake

* Replace the whole object and specific methods (3rd Party - DB, Libs etc.) = use Mock
	+ If there is an object with more than 1 method