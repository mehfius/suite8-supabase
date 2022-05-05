drop view form_prontuarios;

create view form_prontuarios as
  select
        p.id,
        s.uuid,
        p.files,
        u.areas,

        /* Form */
          json_build_object('fields',
          (select json_agg(
            json_build_object(
              'id',id,
              /* 'uuidv4',p.files, */
              'url',url,
              'label',label,
              'type',type,
              'grid',grid,
              'gridmobile',gridmobile,
              'attributes',attributes,
              'required',required,
               'value',
                CASE WHEN url = 'pacientes'THEN (select jsonb_build_object('id',id,'label',label,'files',files) from view_users where id=p.pacientes)::text 
                     WHEN url = 'medicos'   THEN (select jsonb_build_object('id',id,'label',label,'files',files) from view_users where id=p.medicos)::text
                     WHEN url = 'category'  THEN jsonb_build_object('id',c.id,'label',c.label)::text
                     WHEN url = 'label'     THEN p.label::text
                     WHEN url = 'share'     THEN (select json_agg(jsonb_build_object('id',id,'label',label,'files',files)) from view_users where id = ANY(p.share))::text
                     WHEN url = 'files'     THEN (select json_agg(jsonb_build_object('id',id,'filename',filename,'key',key,'uuid',anexos) order by id asc) from files where anexos=p.files)::text
                END 
             
            )order by o) as t1 from fields where id = ANY(array(select fields2 from modules where id=133))
          )
          ) as form
        /* ###### */

    from sessions s

    join prontuarios  p on (p.users=s.users or s.users = ANY (p.share) ) 
    join users        u on (s.users=u.id)
    join category     c on (p.category=c.id) 

    where p.d=false and p.a=true

    order by s.id desc,p.update desc