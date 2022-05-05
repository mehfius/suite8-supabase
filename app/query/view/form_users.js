
create or replace view form_users as
  select
        u.id,
        s.uuid,
        u.areas,
        u.files,
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
                CASE 
                     WHEN url = 'label'       THEN u.label::text
                     WHEN url = 'password'    THEN u.password::text
                     WHEN url = 'email'       THEN u.email::text
                     WHEN url = 'files'       THEN (select json_agg(jsonb_build_object('id',id,'filename',filename,'key',key,'uuid',anexos) order by id asc) from files where anexos=u.files)::text
                     WHEN url = 'telefone'    THEN u.telefone::text
                     WHEN url = 'cidade'      THEN u.cidade::text
                     WHEN url = 'estado'      THEN u.estado::text
                     WHEN url = 'bairro'      THEN u.bairro::text
                     WHEN url = 'nascimento'  THEN u.nascimento::text 
                     WHEN url = 'crm'         THEN u.crm::text
                     WHEN url = 'rua'         THEN u.rua::text
                     WHEN url = 'numero'      THEN u.numero::text       
                     WHEN url = 'complemento' THEN u.complemento::text                                
                     WHEN url = 'identidade'  THEN u.identidade::text
                     WHEN url = 'cpf'         THEN u.cpf::text 
                     WHEN url = 'cep'         THEN u.cep::text
                     WHEN url = 'whatsapp'    THEN u.whatsapp::text
                     WHEN url = 'especialidades'    THEN u.especialidades::text
                END 
             
            )  order by o ) as t1 from fields where id = ANY(array(select fields2 from modules where id=1) ) and a is TRUE
          ) 
          ) as form
        /* ###### */

    from sessions s

    join users        u on (s.users=u.id)

    order by s.id desc