

create or replace view view_category as

  select
  c.id,
  c.label,
  (select json_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=c.files::text) as files,
  c.color
  from category c

  order by c.label asc