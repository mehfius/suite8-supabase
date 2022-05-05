

create or replace view form_mvb as 
  select
        s.users,
        s.uuid,

          json_build_object('fields',
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
                (CASE 

                  WHEN url = 'fmn_menoridade'       THEN mvb.fmn_menoridade::text
                  WHEN url = 'nascimento_sexo'      THEN mvb.nascimento_sexo::text
                  WHEN url = 'peso'                 THEN mvb.peso::text

                  WHEN url = 'altura'               THEN mvb.altura::text
                  WHEN url = 'profissao'            THEN mvb.profissao::text
                  WHEN url = 'nomemae'              THEN mvb.nomemae::text

                 /*  WHEN url = 'comosoube'            THEN mvb.comosoube::text */
                  WHEN url = 'planodesaude'         THEN mvb.planodesaude::text
                  WHEN url = 'contatooutromedico'   THEN mvb.contatooutromedico::text

                  WHEN url = 'calvo'                        THEN mvb.calvo::text
                  WHEN url = 'diagnostico_covid'            THEN mvb.diagnostico_covid::text
                  WHEN url = 'diagnostico_covid_quando'     THEN mvb.diagnostico_covid_quando::text
                  WHEN url = 'inicio_sintomas'              THEN mvb.inicio_sintomas::text
                  WHEN url = 'qual_vacina'                  THEN mvb.qual_vacina::text    

                  WHEN url = 'quantas_doses'                THEN mvb.quantas_doses::text
                  WHEN url = 'quantos_dias_ultima_dose'     THEN mvb.quantos_dias_ultima_dose::text
                  /* WHEN url = 'resultado_teste'              THEN mvb.resultado_teste::text */
                  WHEN url = 'resultado_saturacao'          THEN mvb.resultado_saturacao::text
                  WHEN url = 'temp_media'                   THEN mvb.temp_media::text    
                  WHEN url = 'sintomas'                     THEN mvb.sintomas::text

                  WHEN url = 'deficiencia'                  THEN mvb.deficiencia::text
                  WHEN url = 'outra_cronica'                THEN mvb.outra_cronica::text
                  WHEN url = 'medicamento_rotina'           THEN mvb.medicamento_rotina::text    
                  WHEN url = 'alergico_medicamente'         THEN mvb.alergico_medicamente::text

                  WHEN url = 'qts_pessoas_contato'          THEN mvb.qts_pessoas_contato::text
                  WHEN url = 'mora_sozinho'                 THEN mvb.mora_sozinho::text
                  WHEN url = 'cuidadores_funcionarios'      THEN mvb.cuidadores_funcionarios::text    
                  WHEN url = 'uso_medicamento'              THEN mvb.uso_medicamento::text
                  WHEN url = 'usoregular_preventivamente'   THEN mvb.usoregular_preventivamente::text
                  WHEN url = 'quanto_tempo_medicamento'     THEN mvb.quanto_tempo_medicamento::text    
                  WHEN url = 'receber_orientacao'           THEN mvb.receber_orientacao::text

                  WHEN url = 'consentimento'                THEN mvb.consentimento::text
                  WHEN url = 'consentimento_livre'          THEN mvb.consentimento_livre::text

                  WHEN url = 'qual_especialidade'                 THEN mvb.qual_especialidade::text
                  WHEN url = 'formulario_para_quem'               THEN mvb.formulario_para_quem::text
                  WHEN url = 'qual_idade_filho_parente_incapaz'   THEN mvb.qual_idade_filho_parente_incapaz::text
                  WHEN url = 'necessidade_consulta'               THEN mvb.necessidade_consulta::text

                END) 
       /*          or 
                (CASE 

                  WHEN url = 'temp_media'                     THEN mvb.temp_media::text

                end) */
             
            )  order by o ) as t1 from fields where a is true and d is false and id = ANY(array(select fields2 from modules where url='mvb')  )
          ) 
          ) as form

    from sessions s

    left join mvb          mvb on (mvb.users = s.users) 
    join users          u on (s.users   = u.id)

    order by s.id desc