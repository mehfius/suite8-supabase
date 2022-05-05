drop function select_remedios;

create function select_remedios(modules text,string text) 

 returns jsonb as $$

    var subquery = "(select json_agg(jsonb_build_object('filename',filename,'key',key)) from files where anexos=m.files::text) as files"

    var query = "select m.id,m.label,"+subquery+" from remedios m where unaccent(label) ilike '%'||unaccent($1)||'%' order by label asc"
    var json  = plv8.execute(query,[string]);

    /* 
        var query = "select id,label,files from view_remedios where unaccent(label) ilike '%'||unaccent($1)||'%' order by label asc"
        var json  = plv8.execute(query,[string]);
    */

return json;
 

$$ language plv8;