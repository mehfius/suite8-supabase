drop function f4580485d482a9037af94f68af98adf23819cbdf4;
drop view view_usersremedios;

create view view_usersremedios as 

  select

    ur.id,
    s.uuid,
    r.label,
    ur.posologia,
    CASE WHEN ur.users = s.users THEN true else false END as me

  from sessions s

  join users u on (s.users=u.id)
  join usersremedios ur on (ur.users=u.id)
  join remedios r on (r.id=ur.remedios)

  where ur.d=false and ur.a=true

  order by s.id desc,ur.update desc;



create function f4580485d482a9037af94f68af98adf23819cbdf4(euuid uuid,eid int,modules text) 

returns setof view_usersremedios as $$

if(eid){

  var query = 'select * from view_usersremedios where uuid=$1 and id=$2'
  var json = plv8.execute(query,[euuid,eid]);

}else{

  var query = 'select * from view_usersremedios where uuid=$1'
  var json = plv8.execute(query,[euuid]);

}


return json;

$$ language plv8;

