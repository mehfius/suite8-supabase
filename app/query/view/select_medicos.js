drop view select_medicos;


create view select_medicos as

  select
  u.id,
  u.label,
  (select jsonb_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=u.files) as files
  from users u
   where areas = 50

  order by u.label asc
