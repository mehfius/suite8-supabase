drop view form_users_pessoal;
create view form_users_pessoal as
  select
        u.id,
        s.uuid,
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
                     WHEN url = 'telefone'    THEN u.telefone::text
                     WHEN url = 'cidade'      THEN u.cidade::text
                     WHEN url = 'estado'      THEN u.estado::text
                     WHEN url = 'bairro'      THEN u.bairro::text
                     WHEN url = 'nascimento'  THEN u.nascimento::text
                     WHEN url = 'crm'         THEN u.crm::text
                     WHEN url = 'endereco'    THEN u.endereco::text
                     WHEN url = 'identidade'  THEN u.identidade::text
                     WHEN url = 'cpf'         THEN u.cpf::text
                     WHEN url = 'cep'         THEN u.cep::text
                     WHEN url = 'whatsapp'    THEN u.whatsapp::text
                     WHEN url = 'especialidades'    THEN u.especialidades::text
                END 
             
            )order by o) as t1 from fields where id = ANY(array(select fields2 from modules where id=3))
          )
          ) as form
        /* ###### */

    from sessions s

    join users_pessoal        u on (s.users=u.users)

    order by s.id desc