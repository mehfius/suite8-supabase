
create or replace view view_forms as

select
        p.id,
        /* Form */
      
          (select json_agg(
            json_build_object(
              'id',id,
              'url',url,
              'label',label,
              'type',type,
              'grid',grid,
              'gridmobile',gridmobile,
              'attributes',attributes,
              'required',required,
              'value',
                CASE WHEN url = 'pacientes' THEN (select jsonb_build_object('id',id,'label',label,'files',files) from view_users where id=p.pacientes)::text 
                     WHEN url = 'medicos'   THEN (select jsonb_build_object('id',id,'label',label,'files',files) from view_users where id=p.medicos)::text
                     WHEN url = 'category'  THEN (select jsonb_build_object('id',id,'label',label,'files',files) from category where id=p.category)::text
                     WHEN url = 'label'     THEN p.label::text
                     WHEN url = 'share'     THEN p.share::text

                     WHEN url = 'files'     THEN (select json_agg(jsonb_build_object('ud',id,'filename',filename,'key',key) order by id) from files where anexos=p.files)::text
                END
             
           ) order by o
            ) from fields where id = ANY(array(select fields2 from modules where id=133)) 
          
          ) as form

          from prontuarios p where p.id = 21233


/* drop view view_forms;

create view view_forms as
  select
    
        s.uuid,
        p.id,
      
        (select json_agg(json_build_object('id',id,'label',label)) from users where  p.share like '%,'||id||',%' ) as share  

    from sessions s

    join prontuarios p on (p.users=s.users) 
    join users u on (s.users=u.id)
    join category c on (p.category=c.id) 

    where p.d=false and p.a=true

    order by s.id desc,p.update desc
 */