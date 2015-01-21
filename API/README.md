## Routes 

* GET /1/auth/:role - Generate token with role set to :role
* GET /1/admin/ - Requires auth token with role=admin. Returns {name='The Admin'} if valid.

Everything else expect an error.
