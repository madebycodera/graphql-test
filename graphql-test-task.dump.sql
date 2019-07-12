--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

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
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: andrew
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO andrew;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: andrew
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO andrew;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrew
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: andrew
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO andrew;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: andrew
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO andrew;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrew
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: todo_list; Type: TABLE; Schema: public; Owner: andrew
--

CREATE TABLE public.todo_list (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    completed boolean DEFAULT false,
    priority integer DEFAULT 1
);


ALTER TABLE public.todo_list OWNER TO andrew;

--
-- Name: todo_list_id_seq; Type: SEQUENCE; Schema: public; Owner: andrew
--

CREATE SEQUENCE public.todo_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_list_id_seq OWNER TO andrew;

--
-- Name: todo_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrew
--

ALTER SEQUENCE public.todo_list_id_seq OWNED BY public.todo_list.id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: andrew
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: andrew
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: todo_list id; Type: DEFAULT; Schema: public; Owner: andrew
--

ALTER TABLE ONLY public.todo_list ALTER COLUMN id SET DEFAULT nextval('public.todo_list_id_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: andrew
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20190711191934_todo_list.js	1	2019-07-12 14:21:54.354+03
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: andrew
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: todo_list; Type: TABLE DATA; Schema: public; Owner: andrew
--

COPY public.todo_list (id, description, "createdAt", completed, priority) FROM stdin;
1	Complete task	2019-07-12 14:22:00.234+03	f	1
2	Do homework	2019-07-12 14:22:00.234+03	t	2
3	Do shopping	2019-07-12 14:22:00.234+03	f	3
4	Read the book	2019-07-12 14:22:00.234+03	f	4
5	Take a rest	2019-07-12 14:22:00.234+03	t	5
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andrew
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 1, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: andrew
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: todo_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andrew
--

SELECT pg_catalog.setval('public.todo_list_id_seq', 5, true);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: andrew
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: andrew
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: todo_list todo_list_pkey; Type: CONSTRAINT; Schema: public; Owner: andrew
--

ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT todo_list_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

