CREATE DATABASE ieiproj

CREATE FUNCTION trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
 BEGIN
 NEW.updated_at = NOW();
 RETURN NEW;
 END;
$$;

CREATE TABLE consultas (
  	id SERIAL PRIMARY KEY,
    nome_paciente text NOT NULL,
    data timestamp without time zone NOT NULL,
    hora text NOT NULL,
    valor_consulta real NOT NULL,
    valor_instituicao real NOT NULL,
    valor_profissional real NOT NULL,
    pagamento text NOT NULL,
    observacao text,
    created_at timestamp without time zone NOT NULL,
    profissional_id integer NOT NULL,
    updated_at timestamp without time zone,
    user_id integer
);


CREATE TABLE profissionais (
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    especialidade text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    email text NOT NULL,
    cpf_cnpj text NOT NULL,
    created_at timestamp without time zone,
    senha text NOT NULL,
    updated_at timestamp without time zone,
    reset_token text,
    reset_token_expires text
);


ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


CREATE TRIGGER set_timestamp BEFORE UPDATE ON consultas FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp BEFORE UPDATE ON profissionais FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

ALTER TABLE ONLY consultas
    ADD CONSTRAINT consultas_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
