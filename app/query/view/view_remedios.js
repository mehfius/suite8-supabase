drop view view_remedios;

create view view_remedios as 



select r.id,r.label,(select json_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=r.files::text) as files from remedios r order by label asc
