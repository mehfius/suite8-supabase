/* create or replace function select_pacientes(string text) 
returns setof select_pacientes
language sql
as $$
  select id,label,files from select_pacientes where unaccent(label) ilike '%'||unaccent(string)||'%' or id::text like '%'||string||'%';
$$;
 */
create or replace function select_category(string text) 
returns setof select_category
language sql
as $$
  select id,label,files,color from select_category where unaccent(label) ilike '%'||unaccent(string)||'%' or id::text like '%'||string||'%';
$$;

/* create or replace function select_share(string text) 
returns setof select_share
language sql
as $$
  select id,label,areas,files from select_share where unaccent(label) ilike '%'||unaccent(string)||'%' or id::text like '%'||string||'%';
$$; */