
create or replace view select_pacientes as

  select
  u.id,
  u.label,
  (select jsonb_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=u.files) as files
  from users u
   where areas = 100 and a is true and d is false

  order by u.label asc
