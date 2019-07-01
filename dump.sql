--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Debian 11.3-1.pgdg90+1)
-- Dumped by pg_dump version 11.3

-- Started on 2019-07-01 17:56:10 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 24656)
-- Name: todo_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo_entity
(
    id          uuid                        DEFAULT public.uuid_generate_v4() NOT NULL,
    description character varying(255)                                        NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()                     NOT NULL,
    completed   boolean                     DEFAULT false                     NOT NULL,
    priority    smallint                    DEFAULT 1                         NOT NULL,
    "userId"    uuid                                                          NOT NULL
);


ALTER TABLE public.todo_entity
    OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 24645)
-- Name: user_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_entity
(
    id       uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name     character varying(255)                 NOT NULL,
    password character varying(255)                 NOT NULL
);


ALTER TABLE public.user_entity
    OWNER TO postgres;

--
-- TOC entry 2888 (class 0 OID 24656)
-- Dependencies: 198
-- Data for Name: todo_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todo_entity (id, description, "createdAt", completed, priority, "userId") FROM stdin;
51c60bfc-4bf6-49ba-b15a-6e026ee07547	test	2019-07-01 14:46:50.168247	f	10	d47b0f4b-2263-49fd-816c-89b9e7ce241d
\.


--
-- TOC entry 2887 (class 0 OID 24645)
-- Dependencies: 197
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_entity (id, name, password) FROM stdin;
d47b0f4b-2263-49fd-816c-89b9e7ce241d	test	$2b$10$ypeSbMviqRTOArJC7Fkhs.6vJkEex36kzYAr/BdF./ietMWORHYKm
\.


--
-- TOC entry 2764 (class 2606 OID 24664)
-- Name: todo_entity PK_5e18fff6d62959da212066f2882; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo_entity
    ADD CONSTRAINT "PK_5e18fff6d62959da212066f2882" PRIMARY KEY (id);


--
-- TOC entry 2760 (class 2606 OID 24653)
-- Name: user_entity PK_b54f8ea623b17094db7667d8206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id);


--
-- TOC entry 2762 (class 2606 OID 24655)
-- Name: user_entity UQ_3fe76ecf0f0ef036ff981e9f67d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "UQ_3fe76ecf0f0ef036ff981e9f67d" UNIQUE (name);


--
-- TOC entry 2765 (class 2606 OID 24665)
-- Name: todo_entity FK_f3037daa47e75647225318cc58e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo_entity
    ADD CONSTRAINT "FK_f3037daa47e75647225318cc58e" FOREIGN KEY ("userId") REFERENCES public.user_entity (id);


-- Completed on 2019-07-01 17:56:10 EEST

--
-- PostgreSQL database dump complete
--

