
create or replace view select_share as

  select
  u.id,
  u.label,
  (select label from areas where id=u.areas) as areas,
  (select jsonb_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=u.files) as files
  from users u


  order by u.label asc
