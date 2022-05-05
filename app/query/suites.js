CREATE TABLE public.suites (
    id bigint NOT NULL,
    url character varying,
    a boolean,
    d boolean,
    label character varying,
    data timestamp without time zone DEFAULT now(),
    users bigint DEFAULT '999'::bigint NOT NULL,
    files uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    color1 character varying
);