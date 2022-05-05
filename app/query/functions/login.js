create or replace function login(email text,password text) 
returns setof users
language sql
as $$
declare
  result1 bigint;
begin
  select label,areas from users where email = login.email and password=login.password



end;
$$;

