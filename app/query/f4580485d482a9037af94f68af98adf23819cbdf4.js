drop function f4580485d482a9037af94f68af98adf23819cbdf4;

create function f4580485d482a9037af94f68af98adf23819cbdf4(euuid uuid,modules text) 

returns setof view_usersremedios as $$

var query = 'select * from view_usersremedios where uuid=$1'

var json = plv8.execute(query,[euuid]);

return json;

$$ language plv8;