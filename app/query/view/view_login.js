
drop view view_login;
create view view_login as

  select jsonb_build_object('label',u.label,'areas',u.areas,'beta',u.beta,'premium',u.premium,'customforms',customforms,'profileimage',(select jsonb_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=u.files)) as user,

  u.email,
  u.password,
  u.id,


(select jsonb_agg(jsonb_build_object('id',id,'label',label,'modules',modules)) from view_groups where areas=u.areas) as nav

  from users u
