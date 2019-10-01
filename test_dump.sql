Password: 
--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todo; Type: TABLE; Schema: public; Owner: kek
--

CREATE TABLE public.todo (
    id integer NOT NULL,
    description text NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    priority integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.todo OWNER TO kek;

--
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: kek
--

CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_id_seq OWNER TO kek;

--
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kek
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;


--
-- Name: todo id; Type: DEFAULT; Schema: public; Owner: kek
--

ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: kek
--

COPY public.todo (id, description, completed, priority, created_at) FROM stdin;
1	Test 1	f	1	2019-10-01 13:11:29.14956
2	Test 2	f	2	2019-10-01 13:11:29.160806
3	Test 3	f	1	2019-10-01 13:11:29.17207
4	Test 4	f	1	2019-10-01 13:11:29.18215
5	Test 5	f	4	2019-10-01 13:11:29.192361
6	Test 6	f	1	2019-10-01 13:11:29.202645
\.


--
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kek
--

SELECT pg_catalog.setval('public.todo_id_seq', 6, true);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: kek
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

