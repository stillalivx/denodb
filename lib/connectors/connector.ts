import type { QueryDescription } from "../query-builder.ts";
import { Translator } from "../translators/translator.ts";

/** Default connector options. */
export interface ConnectorOptions {}

/** Default connector client. */
export interface ConnectorClient {}

/** Connector interface for a database provider connection. */
export interface Connector {
  /** Database dialect this connector is for. */
  readonly _dialect: string;

  /** Translator that converts queries to a database-specific command. */
  _translator: Translator;

  /** Client that maintains an external database connection. */
  _client: ConnectorClient;

  /** Options to connect to an external instance. */
  _options: ConnectorOptions;

  /** Is the client connected to an external instance. */
  _connected: boolean;

  /** Test connection. */
  ping(): Promise<boolean>;

  /** Connect to an external database instance. */
  _makeConnection(): void;

  /** Execute a query on the external database instance. */
  query(queryDescription: QueryDescription): Promise<any | any[]>;

  /** Execute queries within a transaction on the database instance. */
  transaction?(queries: () => Promise<void>): Promise<void>;

  /** Disconnect from the external database instance. */
  close(): Promise<any>;
}
