--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.2

-- Started on 2020-03-08 14:52:31 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3183 (class 1262 OID 16494)
-- Name: todos; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE todos WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


ALTER DATABASE todos OWNER TO admin;

\connect todos

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16549)
-- Name: todo; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.todo (
    id character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" character varying NOT NULL,
    completed boolean NOT NULL,
    priority integer NOT NULL
);


ALTER TABLE public.todo OWNER TO admin;

--
-- TOC entry 3177 (class 0 OID 16549)
-- Dependencies: 196
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.todo (id, description, "createdAt", completed, priority) FROM stdin;
56e29274-ce4f-4206-9f68-f7779e273de5	Learn Apollo	2020-03-08 13:21:10.044 +00:00	f	2
ae1119cf-35c7-4bdd-a92a-1140791d350f	Learn graphQL	2020-03-08 13:31:30.580 +00:00	f	1
\.


--
-- TOC entry 3055 (class 2606 OID 16556)
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


-- Completed on 2020-03-08 14:52:31 CET

--
-- PostgreSQL database dump complete
--

-- Completed on 2020-03-08 14:52:31 CET

--
-- PostgreSQL database cluster dump complete
--

