drop view view_users;


create view view_users as

  select
  u.id,
  u.label,
  u.areas,
  (select json_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=u.files) as files
  from users u


  order by u.label asc
