/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "userpackage";

export interface PublicKey {
  keyType: Long;
  key: Uint8Array;
}

export interface Process {
  process: Uint8Array;
}

export interface Index {
  indexType: Long;
  logicalClock: Long;
}

export interface Indices {
  indices: Index[];
}

export interface VectorClock {
  logicalClocks: Long[];
}

export interface SignedEvent {
  signature: Uint8Array;
  event: Uint8Array;
}

export interface LWWElementSet {
  operation: LWWElementSet_Operation;
  value: Uint8Array;
  unixMilliseconds: Long;
}

export enum LWWElementSet_Operation {
  ADD = 0,
  REMOVE = 1,
  UNRECOGNIZED = -1,
}

export function lWWElementSet_OperationFromJSON(object: any): LWWElementSet_Operation {
  switch (object) {
    case 0:
    case "ADD":
      return LWWElementSet_Operation.ADD;
    case 1:
    case "REMOVE":
      return LWWElementSet_Operation.REMOVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LWWElementSet_Operation.UNRECOGNIZED;
  }
}

export function lWWElementSet_OperationToJSON(object: LWWElementSet_Operation): string {
  switch (object) {
    case LWWElementSet_Operation.ADD:
      return "ADD";
    case LWWElementSet_Operation.REMOVE:
      return "REMOVE";
    case LWWElementSet_Operation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface LWWElement {
  value: Uint8Array;
  unixMilliseconds: Long;
}

export interface Server {
  server: string;
}

export interface ImageManifest {
  mime: string;
  width: Long;
  height: Long;
  byteCount: Long;
  process: Process | undefined;
  sections: Range[];
}

export interface ImageBundle {
  imageManifests: ImageManifest[];
}

export interface Event {
  system: PublicKey | undefined;
  process: Process | undefined;
  logicalClock: Long;
  contentType: Long;
  content: Uint8Array;
  vectorClock: VectorClock | undefined;
  indices: Indices | undefined;
  lwwElementSet?: LWWElementSet | undefined;
  lwwElement?: LWWElement | undefined;
  references: Reference[];
  unixMilliseconds?: Long | undefined;
}

export interface Digest {
  digestType: Long;
  digest: Uint8Array;
}

export interface Pointer {
  system: PublicKey | undefined;
  process: Process | undefined;
  logicalClock: Long;
  eventDigest: Digest | undefined;
}

export interface Delete {
  process: Process | undefined;
  logicalClock: Long;
  indices: Indices | undefined;
  unixMilliseconds?: Long | undefined;
  contentType: Long;
}

export interface Events {
  events: SignedEvent[];
}

export interface PublicKeys {
  systems: PublicKey[];
}

export interface Range {
  low: Long;
  high: Long;
}

export interface RangesForProcess {
  process: Process | undefined;
  ranges: Range[];
}

export interface RangesForSystem {
  rangesForProcesses: RangesForProcess[];
}

export interface PrivateKey {
  keyType: Long;
  key: Uint8Array;
}

export interface KeyPair {
  keyType: Long;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}

export interface ExportBundle {
  keyPair: KeyPair | undefined;
  events: Events | undefined;
}

export interface ResultEventsAndRelatedEventsAndCursor {
  resultEvents: Events | undefined;
  relatedEvents: Events | undefined;
  cursor?: Uint8Array | undefined;
}

export interface Reference {
  referenceType: Long;
  reference: Uint8Array;
}

export interface Post {
  content?: string | undefined;
  image?: Pointer | undefined;
}

export interface Claim {
  claimType: Long;
  claimFields: ClaimFieldEntry[];
}

export interface ClaimFieldEntry {
  key: Long;
  value: string;
}

export interface Vouch {
}

export interface StorageTypeProcessSecret {
  system: PrivateKey | undefined;
  process: Process | undefined;
}

export interface StorageTypeProcessState {
  logicalClock: Long;
  ranges: Range[];
  indices: Indices | undefined;
}

export interface StorageTypeCRDTSetItem {
  contentType: Long;
  value: Uint8Array;
  unixMilliseconds: Long;
  operation: LWWElementSet_Operation;
}

export interface StorageTypeCRDTItem {
  contentType: Long;
  value: Uint8Array;
  unixMilliseconds: Long;
}

export interface StorageTypeSystemState {
  processes: Process[];
  crdtItems: StorageTypeCRDTItem[];
}

export interface StorageTypeEvent {
  event?: SignedEvent | undefined;
  mutationPointer?: Pointer | undefined;
}

export interface RepeatedUInt64 {
  numbers: Long[];
}

export interface QueryReferencesRequest {
  reference: Reference | undefined;
  cursor?: Uint8Array | undefined;
  requestEvents?: QueryReferencesRequestEvents | undefined;
  countLwwElementReferences: QueryReferencesRequestCountLWWElementReferences[];
  countReferences: QueryReferencesRequestCountReferences[];
}

export interface QueryReferencesRequestEvents {
  fromType?: Long | undefined;
  countLwwElementReferences: QueryReferencesRequestCountLWWElementReferences[];
  countReferences: QueryReferencesRequestCountReferences[];
}

export interface QueryReferencesRequestCountLWWElementReferences {
  value: Uint8Array;
  fromType?: Long | undefined;
}

export interface QueryReferencesRequestCountReferences {
  fromType?: Long | undefined;
}

export interface QueryReferencesResponseEventItem {
  event: SignedEvent | undefined;
  counts: Long[];
}

export interface QueryReferencesResponse {
  items: QueryReferencesResponseEventItem[];
  relatedEvents: SignedEvent[];
  cursor?: Uint8Array | undefined;
  counts: Long[];
}

export interface QueryClaimToSystemRequest {
  claimType: Long;
  trustRoot: PublicKey | undefined;
  matchAnyField?: string | undefined;
  matchAllFields?: QueryClaimToSystemRequestMatchAll | undefined;
}

export interface QueryClaimToSystemRequestMatchAll {
  fields: ClaimFieldEntry[];
}

export interface QueryClaimToSystemResponse {
  matches: QueryClaimToSystemResponseMatch[];
}

export interface QueryClaimToSystemResponseMatch {
  claim: SignedEvent | undefined;
  proofChain: SignedEvent[];
}

/** /query_index */
export interface QueryIndexResponse {
  events: SignedEvent[];
  proof: SignedEvent[];
}

export interface URLInfo {
  /**
   * url_type 1 = URLInfoSystemLink
   * url_type 2 = URLInfoEventLink
   * url_type 3 = ExportBundle
   * url_type 4 = URLInfoDataLink
   */
  urlType: Long;
  body: Uint8Array;
}

export interface URLInfoSystemLink {
  system: PublicKey | undefined;
  servers: string[];
}

export interface URLInfoEventLink {
  system: PublicKey | undefined;
  process: Process | undefined;
  logicalClock: Long;
  servers: string[];
}

export interface URLInfoDataLink {
  system: PublicKey | undefined;
  process: Process | undefined;
  servers: string[];
  byteCount: Long;
  sections: Range[];
  mime?: string | undefined;
}

export interface HarborChallengeResponse {
  /** HarborChallengeResponseBody */
  body: Uint8Array;
  hmac: Uint8Array;
}

export interface HarborChallengeResponseBody {
  challenge: Uint8Array;
  createdOn: Long;
}

export interface HarborValidateRequest {
  challenge: HarborChallengeResponse | undefined;
  system: PublicKey | undefined;
  signature: Uint8Array;
}

export interface FindClaimAndVouchRequest {
  vouchingSystem: PublicKey | undefined;
  claimingSystem: PublicKey | undefined;
  fields: ClaimFieldEntry[];
  claimType: Long;
}

export interface FindClaimAndVouchResponse {
  vouch: SignedEvent | undefined;
  claim: SignedEvent | undefined;
}

function createBasePublicKey(): PublicKey {
  return { keyType: Long.UZERO, key: new Uint8Array(0) };
}

export const PublicKey = {
  encode(message: PublicKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.keyType.isZero()) {
      writer.uint32(8).uint64(message.keyType);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublicKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublicKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keyType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublicKey {
    return {
      keyType: isSet(object.keyType) ? Long.fromValue(object.keyType) : Long.UZERO,
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
    };
  },

  toJSON(message: PublicKey): unknown {
    const obj: any = {};
    if (!message.keyType.isZero()) {
      obj.keyType = (message.keyType || Long.UZERO).toString();
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublicKey>, I>>(base?: I): PublicKey {
    return PublicKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublicKey>, I>>(object: I): PublicKey {
    const message = createBasePublicKey();
    message.keyType = (object.keyType !== undefined && object.keyType !== null)
      ? Long.fromValue(object.keyType)
      : Long.UZERO;
    message.key = object.key ?? new Uint8Array(0);
    return message;
  },
};

function createBaseProcess(): Process {
  return { process: new Uint8Array(0) };
}

export const Process = {
  encode(message: Process, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.process.length !== 0) {
      writer.uint32(10).bytes(message.process);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Process {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.process = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Process {
    return { process: isSet(object.process) ? bytesFromBase64(object.process) : new Uint8Array(0) };
  },

  toJSON(message: Process): unknown {
    const obj: any = {};
    if (message.process.length !== 0) {
      obj.process = base64FromBytes(message.process);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Process>, I>>(base?: I): Process {
    return Process.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Process>, I>>(object: I): Process {
    const message = createBaseProcess();
    message.process = object.process ?? new Uint8Array(0);
    return message;
  },
};

function createBaseIndex(): Index {
  return { indexType: Long.UZERO, logicalClock: Long.UZERO };
}

export const Index = {
  encode(message: Index, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.indexType.isZero()) {
      writer.uint32(8).uint64(message.indexType);
    }
    if (!message.logicalClock.isZero()) {
      writer.uint32(16).uint64(message.logicalClock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Index {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.indexType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.logicalClock = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Index {
    return {
      indexType: isSet(object.indexType) ? Long.fromValue(object.indexType) : Long.UZERO,
      logicalClock: isSet(object.logicalClock) ? Long.fromValue(object.logicalClock) : Long.UZERO,
    };
  },

  toJSON(message: Index): unknown {
    const obj: any = {};
    if (!message.indexType.isZero()) {
      obj.indexType = (message.indexType || Long.UZERO).toString();
    }
    if (!message.logicalClock.isZero()) {
      obj.logicalClock = (message.logicalClock || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Index>, I>>(base?: I): Index {
    return Index.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Index>, I>>(object: I): Index {
    const message = createBaseIndex();
    message.indexType = (object.indexType !== undefined && object.indexType !== null)
      ? Long.fromValue(object.indexType)
      : Long.UZERO;
    message.logicalClock = (object.logicalClock !== undefined && object.logicalClock !== null)
      ? Long.fromValue(object.logicalClock)
      : Long.UZERO;
    return message;
  },
};

function createBaseIndices(): Indices {
  return { indices: [] };
}

export const Indices = {
  encode(message: Indices, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.indices) {
      Index.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Indices {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndices();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.indices.push(Index.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Indices {
    return { indices: Array.isArray(object?.indices) ? object.indices.map((e: any) => Index.fromJSON(e)) : [] };
  },

  toJSON(message: Indices): unknown {
    const obj: any = {};
    if (message.indices?.length) {
      obj.indices = message.indices.map((e) => Index.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Indices>, I>>(base?: I): Indices {
    return Indices.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Indices>, I>>(object: I): Indices {
    const message = createBaseIndices();
    message.indices = object.indices?.map((e) => Index.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVectorClock(): VectorClock {
  return { logicalClocks: [] };
}

export const VectorClock = {
  encode(message: VectorClock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.logicalClocks) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VectorClock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVectorClock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.logicalClocks.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.logicalClocks.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VectorClock {
    return {
      logicalClocks: Array.isArray(object?.logicalClocks)
        ? object.logicalClocks.map((e: any) => Long.fromValue(e))
        : [],
    };
  },

  toJSON(message: VectorClock): unknown {
    const obj: any = {};
    if (message.logicalClocks?.length) {
      obj.logicalClocks = message.logicalClocks.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VectorClock>, I>>(base?: I): VectorClock {
    return VectorClock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VectorClock>, I>>(object: I): VectorClock {
    const message = createBaseVectorClock();
    message.logicalClocks = object.logicalClocks?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseSignedEvent(): SignedEvent {
  return { signature: new Uint8Array(0), event: new Uint8Array(0) };
}

export const SignedEvent = {
  encode(message: SignedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature.length !== 0) {
      writer.uint32(10).bytes(message.signature);
    }
    if (message.event.length !== 0) {
      writer.uint32(18).bytes(message.event);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.event = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignedEvent {
    return {
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      event: isSet(object.event) ? bytesFromBase64(object.event) : new Uint8Array(0),
    };
  },

  toJSON(message: SignedEvent): unknown {
    const obj: any = {};
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.event.length !== 0) {
      obj.event = base64FromBytes(message.event);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignedEvent>, I>>(base?: I): SignedEvent {
    return SignedEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignedEvent>, I>>(object: I): SignedEvent {
    const message = createBaseSignedEvent();
    message.signature = object.signature ?? new Uint8Array(0);
    message.event = object.event ?? new Uint8Array(0);
    return message;
  },
};

function createBaseLWWElementSet(): LWWElementSet {
  return { operation: 0, value: new Uint8Array(0), unixMilliseconds: Long.UZERO };
}

export const LWWElementSet = {
  encode(message: LWWElementSet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== 0) {
      writer.uint32(8).int32(message.operation);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      writer.uint32(24).uint64(message.unixMilliseconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LWWElementSet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLWWElementSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operation = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.unixMilliseconds = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LWWElementSet {
    return {
      operation: isSet(object.operation) ? lWWElementSet_OperationFromJSON(object.operation) : 0,
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      unixMilliseconds: isSet(object.unixMilliseconds) ? Long.fromValue(object.unixMilliseconds) : Long.UZERO,
    };
  },

  toJSON(message: LWWElementSet): unknown {
    const obj: any = {};
    if (message.operation !== 0) {
      obj.operation = lWWElementSet_OperationToJSON(message.operation);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      obj.unixMilliseconds = (message.unixMilliseconds || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LWWElementSet>, I>>(base?: I): LWWElementSet {
    return LWWElementSet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LWWElementSet>, I>>(object: I): LWWElementSet {
    const message = createBaseLWWElementSet();
    message.operation = object.operation ?? 0;
    message.value = object.value ?? new Uint8Array(0);
    message.unixMilliseconds = (object.unixMilliseconds !== undefined && object.unixMilliseconds !== null)
      ? Long.fromValue(object.unixMilliseconds)
      : Long.UZERO;
    return message;
  },
};

function createBaseLWWElement(): LWWElement {
  return { value: new Uint8Array(0), unixMilliseconds: Long.UZERO };
}

export const LWWElement = {
  encode(message: LWWElement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      writer.uint32(16).uint64(message.unixMilliseconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LWWElement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLWWElement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.unixMilliseconds = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LWWElement {
    return {
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      unixMilliseconds: isSet(object.unixMilliseconds) ? Long.fromValue(object.unixMilliseconds) : Long.UZERO,
    };
  },

  toJSON(message: LWWElement): unknown {
    const obj: any = {};
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      obj.unixMilliseconds = (message.unixMilliseconds || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LWWElement>, I>>(base?: I): LWWElement {
    return LWWElement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LWWElement>, I>>(object: I): LWWElement {
    const message = createBaseLWWElement();
    message.value = object.value ?? new Uint8Array(0);
    message.unixMilliseconds = (object.unixMilliseconds !== undefined && object.unixMilliseconds !== null)
      ? Long.fromValue(object.unixMilliseconds)
      : Long.UZERO;
    return message;
  },
};

function createBaseServer(): Server {
  return { server: "" };
}

export const Server = {
  encode(message: Server, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.server !== "") {
      writer.uint32(10).string(message.server);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Server {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.server = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Server {
    return { server: isSet(object.server) ? String(object.server) : "" };
  },

  toJSON(message: Server): unknown {
    const obj: any = {};
    if (message.server !== "") {
      obj.server = message.server;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Server>, I>>(base?: I): Server {
    return Server.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Server>, I>>(object: I): Server {
    const message = createBaseServer();
    message.server = object.server ?? "";
    return message;
  },
};

function createBaseImageManifest(): ImageManifest {
  return { mime: "", width: Long.UZERO, height: Long.UZERO, byteCount: Long.UZERO, process: undefined, sections: [] };
}

export const ImageManifest = {
  encode(message: ImageManifest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mime !== "") {
      writer.uint32(10).string(message.mime);
    }
    if (!message.width.isZero()) {
      writer.uint32(16).uint64(message.width);
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    if (!message.byteCount.isZero()) {
      writer.uint32(32).uint64(message.byteCount);
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sections) {
      Range.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageManifest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageManifest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mime = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.width = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.byteCount = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sections.push(Range.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImageManifest {
    return {
      mime: isSet(object.mime) ? String(object.mime) : "",
      width: isSet(object.width) ? Long.fromValue(object.width) : Long.UZERO,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      byteCount: isSet(object.byteCount) ? Long.fromValue(object.byteCount) : Long.UZERO,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      sections: Array.isArray(object?.sections) ? object.sections.map((e: any) => Range.fromJSON(e)) : [],
    };
  },

  toJSON(message: ImageManifest): unknown {
    const obj: any = {};
    if (message.mime !== "") {
      obj.mime = message.mime;
    }
    if (!message.width.isZero()) {
      obj.width = (message.width || Long.UZERO).toString();
    }
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    if (!message.byteCount.isZero()) {
      obj.byteCount = (message.byteCount || Long.UZERO).toString();
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (message.sections?.length) {
      obj.sections = message.sections.map((e) => Range.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImageManifest>, I>>(base?: I): ImageManifest {
    return ImageManifest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImageManifest>, I>>(object: I): ImageManifest {
    const message = createBaseImageManifest();
    message.mime = object.mime ?? "";
    message.width = (object.width !== undefined && object.width !== null) ? Long.fromValue(object.width) : Long.UZERO;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    message.byteCount = (object.byteCount !== undefined && object.byteCount !== null)
      ? Long.fromValue(object.byteCount)
      : Long.UZERO;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.sections = object.sections?.map((e) => Range.fromPartial(e)) || [];
    return message;
  },
};

function createBaseImageBundle(): ImageBundle {
  return { imageManifests: [] };
}

export const ImageBundle = {
  encode(message: ImageBundle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.imageManifests) {
      ImageManifest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageBundle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageBundle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imageManifests.push(ImageManifest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImageBundle {
    return {
      imageManifests: Array.isArray(object?.imageManifests)
        ? object.imageManifests.map((e: any) => ImageManifest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ImageBundle): unknown {
    const obj: any = {};
    if (message.imageManifests?.length) {
      obj.imageManifests = message.imageManifests.map((e) => ImageManifest.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImageBundle>, I>>(base?: I): ImageBundle {
    return ImageBundle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImageBundle>, I>>(object: I): ImageBundle {
    const message = createBaseImageBundle();
    message.imageManifests = object.imageManifests?.map((e) => ImageManifest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEvent(): Event {
  return {
    system: undefined,
    process: undefined,
    logicalClock: Long.UZERO,
    contentType: Long.UZERO,
    content: new Uint8Array(0),
    vectorClock: undefined,
    indices: undefined,
    lwwElementSet: undefined,
    lwwElement: undefined,
    references: [],
    unixMilliseconds: undefined,
  };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.system !== undefined) {
      PublicKey.encode(message.system, writer.uint32(10).fork()).ldelim();
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(18).fork()).ldelim();
    }
    if (!message.logicalClock.isZero()) {
      writer.uint32(24).uint64(message.logicalClock);
    }
    if (!message.contentType.isZero()) {
      writer.uint32(32).uint64(message.contentType);
    }
    if (message.content.length !== 0) {
      writer.uint32(42).bytes(message.content);
    }
    if (message.vectorClock !== undefined) {
      VectorClock.encode(message.vectorClock, writer.uint32(50).fork()).ldelim();
    }
    if (message.indices !== undefined) {
      Indices.encode(message.indices, writer.uint32(58).fork()).ldelim();
    }
    if (message.lwwElementSet !== undefined) {
      LWWElementSet.encode(message.lwwElementSet, writer.uint32(66).fork()).ldelim();
    }
    if (message.lwwElement !== undefined) {
      LWWElement.encode(message.lwwElement, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.references) {
      Reference.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.unixMilliseconds !== undefined) {
      writer.uint32(88).uint64(message.unixMilliseconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.system = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.logicalClock = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.contentType = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.vectorClock = VectorClock.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.indices = Indices.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.lwwElementSet = LWWElementSet.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.lwwElement = LWWElement.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.references.push(Reference.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.unixMilliseconds = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      system: isSet(object.system) ? PublicKey.fromJSON(object.system) : undefined,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      logicalClock: isSet(object.logicalClock) ? Long.fromValue(object.logicalClock) : Long.UZERO,
      contentType: isSet(object.contentType) ? Long.fromValue(object.contentType) : Long.UZERO,
      content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0),
      vectorClock: isSet(object.vectorClock) ? VectorClock.fromJSON(object.vectorClock) : undefined,
      indices: isSet(object.indices) ? Indices.fromJSON(object.indices) : undefined,
      lwwElementSet: isSet(object.lwwElementSet) ? LWWElementSet.fromJSON(object.lwwElementSet) : undefined,
      lwwElement: isSet(object.lwwElement) ? LWWElement.fromJSON(object.lwwElement) : undefined,
      references: Array.isArray(object?.references) ? object.references.map((e: any) => Reference.fromJSON(e)) : [],
      unixMilliseconds: isSet(object.unixMilliseconds) ? Long.fromValue(object.unixMilliseconds) : undefined,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.system !== undefined) {
      obj.system = PublicKey.toJSON(message.system);
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (!message.logicalClock.isZero()) {
      obj.logicalClock = (message.logicalClock || Long.UZERO).toString();
    }
    if (!message.contentType.isZero()) {
      obj.contentType = (message.contentType || Long.UZERO).toString();
    }
    if (message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.vectorClock !== undefined) {
      obj.vectorClock = VectorClock.toJSON(message.vectorClock);
    }
    if (message.indices !== undefined) {
      obj.indices = Indices.toJSON(message.indices);
    }
    if (message.lwwElementSet !== undefined) {
      obj.lwwElementSet = LWWElementSet.toJSON(message.lwwElementSet);
    }
    if (message.lwwElement !== undefined) {
      obj.lwwElement = LWWElement.toJSON(message.lwwElement);
    }
    if (message.references?.length) {
      obj.references = message.references.map((e) => Reference.toJSON(e));
    }
    if (message.unixMilliseconds !== undefined) {
      obj.unixMilliseconds = (message.unixMilliseconds || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.system = (object.system !== undefined && object.system !== null)
      ? PublicKey.fromPartial(object.system)
      : undefined;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.logicalClock = (object.logicalClock !== undefined && object.logicalClock !== null)
      ? Long.fromValue(object.logicalClock)
      : Long.UZERO;
    message.contentType = (object.contentType !== undefined && object.contentType !== null)
      ? Long.fromValue(object.contentType)
      : Long.UZERO;
    message.content = object.content ?? new Uint8Array(0);
    message.vectorClock = (object.vectorClock !== undefined && object.vectorClock !== null)
      ? VectorClock.fromPartial(object.vectorClock)
      : undefined;
    message.indices = (object.indices !== undefined && object.indices !== null)
      ? Indices.fromPartial(object.indices)
      : undefined;
    message.lwwElementSet = (object.lwwElementSet !== undefined && object.lwwElementSet !== null)
      ? LWWElementSet.fromPartial(object.lwwElementSet)
      : undefined;
    message.lwwElement = (object.lwwElement !== undefined && object.lwwElement !== null)
      ? LWWElement.fromPartial(object.lwwElement)
      : undefined;
    message.references = object.references?.map((e) => Reference.fromPartial(e)) || [];
    message.unixMilliseconds = (object.unixMilliseconds !== undefined && object.unixMilliseconds !== null)
      ? Long.fromValue(object.unixMilliseconds)
      : undefined;
    return message;
  },
};

function createBaseDigest(): Digest {
  return { digestType: Long.UZERO, digest: new Uint8Array(0) };
}

export const Digest = {
  encode(message: Digest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.digestType.isZero()) {
      writer.uint32(8).uint64(message.digestType);
    }
    if (message.digest.length !== 0) {
      writer.uint32(18).bytes(message.digest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Digest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDigest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.digestType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.digest = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Digest {
    return {
      digestType: isSet(object.digestType) ? Long.fromValue(object.digestType) : Long.UZERO,
      digest: isSet(object.digest) ? bytesFromBase64(object.digest) : new Uint8Array(0),
    };
  },

  toJSON(message: Digest): unknown {
    const obj: any = {};
    if (!message.digestType.isZero()) {
      obj.digestType = (message.digestType || Long.UZERO).toString();
    }
    if (message.digest.length !== 0) {
      obj.digest = base64FromBytes(message.digest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Digest>, I>>(base?: I): Digest {
    return Digest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Digest>, I>>(object: I): Digest {
    const message = createBaseDigest();
    message.digestType = (object.digestType !== undefined && object.digestType !== null)
      ? Long.fromValue(object.digestType)
      : Long.UZERO;
    message.digest = object.digest ?? new Uint8Array(0);
    return message;
  },
};

function createBasePointer(): Pointer {
  return { system: undefined, process: undefined, logicalClock: Long.UZERO, eventDigest: undefined };
}

export const Pointer = {
  encode(message: Pointer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.system !== undefined) {
      PublicKey.encode(message.system, writer.uint32(10).fork()).ldelim();
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(18).fork()).ldelim();
    }
    if (!message.logicalClock.isZero()) {
      writer.uint32(24).uint64(message.logicalClock);
    }
    if (message.eventDigest !== undefined) {
      Digest.encode(message.eventDigest, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pointer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.system = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.logicalClock = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.eventDigest = Digest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pointer {
    return {
      system: isSet(object.system) ? PublicKey.fromJSON(object.system) : undefined,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      logicalClock: isSet(object.logicalClock) ? Long.fromValue(object.logicalClock) : Long.UZERO,
      eventDigest: isSet(object.eventDigest) ? Digest.fromJSON(object.eventDigest) : undefined,
    };
  },

  toJSON(message: Pointer): unknown {
    const obj: any = {};
    if (message.system !== undefined) {
      obj.system = PublicKey.toJSON(message.system);
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (!message.logicalClock.isZero()) {
      obj.logicalClock = (message.logicalClock || Long.UZERO).toString();
    }
    if (message.eventDigest !== undefined) {
      obj.eventDigest = Digest.toJSON(message.eventDigest);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pointer>, I>>(base?: I): Pointer {
    return Pointer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pointer>, I>>(object: I): Pointer {
    const message = createBasePointer();
    message.system = (object.system !== undefined && object.system !== null)
      ? PublicKey.fromPartial(object.system)
      : undefined;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.logicalClock = (object.logicalClock !== undefined && object.logicalClock !== null)
      ? Long.fromValue(object.logicalClock)
      : Long.UZERO;
    message.eventDigest = (object.eventDigest !== undefined && object.eventDigest !== null)
      ? Digest.fromPartial(object.eventDigest)
      : undefined;
    return message;
  },
};

function createBaseDelete(): Delete {
  return {
    process: undefined,
    logicalClock: Long.UZERO,
    indices: undefined,
    unixMilliseconds: undefined,
    contentType: Long.UZERO,
  };
}

export const Delete = {
  encode(message: Delete, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(10).fork()).ldelim();
    }
    if (!message.logicalClock.isZero()) {
      writer.uint32(16).uint64(message.logicalClock);
    }
    if (message.indices !== undefined) {
      Indices.encode(message.indices, writer.uint32(26).fork()).ldelim();
    }
    if (message.unixMilliseconds !== undefined) {
      writer.uint32(32).uint64(message.unixMilliseconds);
    }
    if (!message.contentType.isZero()) {
      writer.uint32(40).uint64(message.contentType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delete {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelete();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.logicalClock = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.indices = Indices.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.unixMilliseconds = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.contentType = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Delete {
    return {
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      logicalClock: isSet(object.logicalClock) ? Long.fromValue(object.logicalClock) : Long.UZERO,
      indices: isSet(object.indices) ? Indices.fromJSON(object.indices) : undefined,
      unixMilliseconds: isSet(object.unixMilliseconds) ? Long.fromValue(object.unixMilliseconds) : undefined,
      contentType: isSet(object.contentType) ? Long.fromValue(object.contentType) : Long.UZERO,
    };
  },

  toJSON(message: Delete): unknown {
    const obj: any = {};
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (!message.logicalClock.isZero()) {
      obj.logicalClock = (message.logicalClock || Long.UZERO).toString();
    }
    if (message.indices !== undefined) {
      obj.indices = Indices.toJSON(message.indices);
    }
    if (message.unixMilliseconds !== undefined) {
      obj.unixMilliseconds = (message.unixMilliseconds || Long.UZERO).toString();
    }
    if (!message.contentType.isZero()) {
      obj.contentType = (message.contentType || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Delete>, I>>(base?: I): Delete {
    return Delete.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Delete>, I>>(object: I): Delete {
    const message = createBaseDelete();
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.logicalClock = (object.logicalClock !== undefined && object.logicalClock !== null)
      ? Long.fromValue(object.logicalClock)
      : Long.UZERO;
    message.indices = (object.indices !== undefined && object.indices !== null)
      ? Indices.fromPartial(object.indices)
      : undefined;
    message.unixMilliseconds = (object.unixMilliseconds !== undefined && object.unixMilliseconds !== null)
      ? Long.fromValue(object.unixMilliseconds)
      : undefined;
    message.contentType = (object.contentType !== undefined && object.contentType !== null)
      ? Long.fromValue(object.contentType)
      : Long.UZERO;
    return message;
  },
};

function createBaseEvents(): Events {
  return { events: [] };
}

export const Events = {
  encode(message: Events, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.events) {
      SignedEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Events {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvents();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events.push(SignedEvent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Events {
    return { events: Array.isArray(object?.events) ? object.events.map((e: any) => SignedEvent.fromJSON(e)) : [] };
  },

  toJSON(message: Events): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => SignedEvent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Events>, I>>(base?: I): Events {
    return Events.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Events>, I>>(object: I): Events {
    const message = createBaseEvents();
    message.events = object.events?.map((e) => SignedEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBasePublicKeys(): PublicKeys {
  return { systems: [] };
}

export const PublicKeys = {
  encode(message: PublicKeys, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.systems) {
      PublicKey.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublicKeys {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublicKeys();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.systems.push(PublicKey.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublicKeys {
    return { systems: Array.isArray(object?.systems) ? object.systems.map((e: any) => PublicKey.fromJSON(e)) : [] };
  },

  toJSON(message: PublicKeys): unknown {
    const obj: any = {};
    if (message.systems?.length) {
      obj.systems = message.systems.map((e) => PublicKey.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublicKeys>, I>>(base?: I): PublicKeys {
    return PublicKeys.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublicKeys>, I>>(object: I): PublicKeys {
    const message = createBasePublicKeys();
    message.systems = object.systems?.map((e) => PublicKey.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRange(): Range {
  return { low: Long.UZERO, high: Long.UZERO };
}

export const Range = {
  encode(message: Range, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.low.isZero()) {
      writer.uint32(8).uint64(message.low);
    }
    if (!message.high.isZero()) {
      writer.uint32(16).uint64(message.high);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Range {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.low = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.high = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Range {
    return {
      low: isSet(object.low) ? Long.fromValue(object.low) : Long.UZERO,
      high: isSet(object.high) ? Long.fromValue(object.high) : Long.UZERO,
    };
  },

  toJSON(message: Range): unknown {
    const obj: any = {};
    if (!message.low.isZero()) {
      obj.low = (message.low || Long.UZERO).toString();
    }
    if (!message.high.isZero()) {
      obj.high = (message.high || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Range>, I>>(base?: I): Range {
    return Range.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Range>, I>>(object: I): Range {
    const message = createBaseRange();
    message.low = (object.low !== undefined && object.low !== null) ? Long.fromValue(object.low) : Long.UZERO;
    message.high = (object.high !== undefined && object.high !== null) ? Long.fromValue(object.high) : Long.UZERO;
    return message;
  },
};

function createBaseRangesForProcess(): RangesForProcess {
  return { process: undefined, ranges: [] };
}

export const RangesForProcess = {
  encode(message: RangesForProcess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ranges) {
      Range.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RangesForProcess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRangesForProcess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ranges.push(Range.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RangesForProcess {
    return {
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      ranges: Array.isArray(object?.ranges) ? object.ranges.map((e: any) => Range.fromJSON(e)) : [],
    };
  },

  toJSON(message: RangesForProcess): unknown {
    const obj: any = {};
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (message.ranges?.length) {
      obj.ranges = message.ranges.map((e) => Range.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RangesForProcess>, I>>(base?: I): RangesForProcess {
    return RangesForProcess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RangesForProcess>, I>>(object: I): RangesForProcess {
    const message = createBaseRangesForProcess();
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.ranges = object.ranges?.map((e) => Range.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRangesForSystem(): RangesForSystem {
  return { rangesForProcesses: [] };
}

export const RangesForSystem = {
  encode(message: RangesForSystem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rangesForProcesses) {
      RangesForProcess.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RangesForSystem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRangesForSystem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rangesForProcesses.push(RangesForProcess.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RangesForSystem {
    return {
      rangesForProcesses: Array.isArray(object?.rangesForProcesses)
        ? object.rangesForProcesses.map((e: any) => RangesForProcess.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RangesForSystem): unknown {
    const obj: any = {};
    if (message.rangesForProcesses?.length) {
      obj.rangesForProcesses = message.rangesForProcesses.map((e) => RangesForProcess.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RangesForSystem>, I>>(base?: I): RangesForSystem {
    return RangesForSystem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RangesForSystem>, I>>(object: I): RangesForSystem {
    const message = createBaseRangesForSystem();
    message.rangesForProcesses = object.rangesForProcesses?.map((e) => RangesForProcess.fromPartial(e)) || [];
    return message;
  },
};

function createBasePrivateKey(): PrivateKey {
  return { keyType: Long.UZERO, key: new Uint8Array(0) };
}

export const PrivateKey = {
  encode(message: PrivateKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.keyType.isZero()) {
      writer.uint32(8).uint64(message.keyType);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrivateKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrivateKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keyType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PrivateKey {
    return {
      keyType: isSet(object.keyType) ? Long.fromValue(object.keyType) : Long.UZERO,
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
    };
  },

  toJSON(message: PrivateKey): unknown {
    const obj: any = {};
    if (!message.keyType.isZero()) {
      obj.keyType = (message.keyType || Long.UZERO).toString();
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PrivateKey>, I>>(base?: I): PrivateKey {
    return PrivateKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PrivateKey>, I>>(object: I): PrivateKey {
    const message = createBasePrivateKey();
    message.keyType = (object.keyType !== undefined && object.keyType !== null)
      ? Long.fromValue(object.keyType)
      : Long.UZERO;
    message.key = object.key ?? new Uint8Array(0);
    return message;
  },
};

function createBaseKeyPair(): KeyPair {
  return { keyType: Long.UZERO, privateKey: new Uint8Array(0), publicKey: new Uint8Array(0) };
}

export const KeyPair = {
  encode(message: KeyPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.keyType.isZero()) {
      writer.uint32(8).uint64(message.keyType);
    }
    if (message.privateKey.length !== 0) {
      writer.uint32(18).bytes(message.privateKey);
    }
    if (message.publicKey.length !== 0) {
      writer.uint32(26).bytes(message.publicKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keyType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.privateKey = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeyPair {
    return {
      keyType: isSet(object.keyType) ? Long.fromValue(object.keyType) : Long.UZERO,
      privateKey: isSet(object.privateKey) ? bytesFromBase64(object.privateKey) : new Uint8Array(0),
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
    };
  },

  toJSON(message: KeyPair): unknown {
    const obj: any = {};
    if (!message.keyType.isZero()) {
      obj.keyType = (message.keyType || Long.UZERO).toString();
    }
    if (message.privateKey.length !== 0) {
      obj.privateKey = base64FromBytes(message.privateKey);
    }
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KeyPair>, I>>(base?: I): KeyPair {
    return KeyPair.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KeyPair>, I>>(object: I): KeyPair {
    const message = createBaseKeyPair();
    message.keyType = (object.keyType !== undefined && object.keyType !== null)
      ? Long.fromValue(object.keyType)
      : Long.UZERO;
    message.privateKey = object.privateKey ?? new Uint8Array(0);
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    return message;
  },
};

function createBaseExportBundle(): ExportBundle {
  return { keyPair: undefined, events: undefined };
}

export const ExportBundle = {
  encode(message: ExportBundle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyPair !== undefined) {
      KeyPair.encode(message.keyPair, writer.uint32(10).fork()).ldelim();
    }
    if (message.events !== undefined) {
      Events.encode(message.events, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportBundle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportBundle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keyPair = KeyPair.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.events = Events.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportBundle {
    return {
      keyPair: isSet(object.keyPair) ? KeyPair.fromJSON(object.keyPair) : undefined,
      events: isSet(object.events) ? Events.fromJSON(object.events) : undefined,
    };
  },

  toJSON(message: ExportBundle): unknown {
    const obj: any = {};
    if (message.keyPair !== undefined) {
      obj.keyPair = KeyPair.toJSON(message.keyPair);
    }
    if (message.events !== undefined) {
      obj.events = Events.toJSON(message.events);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExportBundle>, I>>(base?: I): ExportBundle {
    return ExportBundle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExportBundle>, I>>(object: I): ExportBundle {
    const message = createBaseExportBundle();
    message.keyPair = (object.keyPair !== undefined && object.keyPair !== null)
      ? KeyPair.fromPartial(object.keyPair)
      : undefined;
    message.events = (object.events !== undefined && object.events !== null)
      ? Events.fromPartial(object.events)
      : undefined;
    return message;
  },
};

function createBaseResultEventsAndRelatedEventsAndCursor(): ResultEventsAndRelatedEventsAndCursor {
  return { resultEvents: undefined, relatedEvents: undefined, cursor: undefined };
}

export const ResultEventsAndRelatedEventsAndCursor = {
  encode(message: ResultEventsAndRelatedEventsAndCursor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultEvents !== undefined) {
      Events.encode(message.resultEvents, writer.uint32(10).fork()).ldelim();
    }
    if (message.relatedEvents !== undefined) {
      Events.encode(message.relatedEvents, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== undefined) {
      writer.uint32(26).bytes(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResultEventsAndRelatedEventsAndCursor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResultEventsAndRelatedEventsAndCursor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resultEvents = Events.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.relatedEvents = Events.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResultEventsAndRelatedEventsAndCursor {
    return {
      resultEvents: isSet(object.resultEvents) ? Events.fromJSON(object.resultEvents) : undefined,
      relatedEvents: isSet(object.relatedEvents) ? Events.fromJSON(object.relatedEvents) : undefined,
      cursor: isSet(object.cursor) ? bytesFromBase64(object.cursor) : undefined,
    };
  },

  toJSON(message: ResultEventsAndRelatedEventsAndCursor): unknown {
    const obj: any = {};
    if (message.resultEvents !== undefined) {
      obj.resultEvents = Events.toJSON(message.resultEvents);
    }
    if (message.relatedEvents !== undefined) {
      obj.relatedEvents = Events.toJSON(message.relatedEvents);
    }
    if (message.cursor !== undefined) {
      obj.cursor = base64FromBytes(message.cursor);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResultEventsAndRelatedEventsAndCursor>, I>>(
    base?: I,
  ): ResultEventsAndRelatedEventsAndCursor {
    return ResultEventsAndRelatedEventsAndCursor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResultEventsAndRelatedEventsAndCursor>, I>>(
    object: I,
  ): ResultEventsAndRelatedEventsAndCursor {
    const message = createBaseResultEventsAndRelatedEventsAndCursor();
    message.resultEvents = (object.resultEvents !== undefined && object.resultEvents !== null)
      ? Events.fromPartial(object.resultEvents)
      : undefined;
    message.relatedEvents = (object.relatedEvents !== undefined && object.relatedEvents !== null)
      ? Events.fromPartial(object.relatedEvents)
      : undefined;
    message.cursor = object.cursor ?? undefined;
    return message;
  },
};

function createBaseReference(): Reference {
  return { referenceType: Long.UZERO, reference: new Uint8Array(0) };
}

export const Reference = {
  encode(message: Reference, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.referenceType.isZero()) {
      writer.uint32(8).uint64(message.referenceType);
    }
    if (message.reference.length !== 0) {
      writer.uint32(18).bytes(message.reference);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reference {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.referenceType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reference = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Reference {
    return {
      referenceType: isSet(object.referenceType) ? Long.fromValue(object.referenceType) : Long.UZERO,
      reference: isSet(object.reference) ? bytesFromBase64(object.reference) : new Uint8Array(0),
    };
  },

  toJSON(message: Reference): unknown {
    const obj: any = {};
    if (!message.referenceType.isZero()) {
      obj.referenceType = (message.referenceType || Long.UZERO).toString();
    }
    if (message.reference.length !== 0) {
      obj.reference = base64FromBytes(message.reference);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Reference>, I>>(base?: I): Reference {
    return Reference.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Reference>, I>>(object: I): Reference {
    const message = createBaseReference();
    message.referenceType = (object.referenceType !== undefined && object.referenceType !== null)
      ? Long.fromValue(object.referenceType)
      : Long.UZERO;
    message.reference = object.reference ?? new Uint8Array(0);
    return message;
  },
};

function createBasePost(): Post {
  return { content: undefined, image: undefined };
}

export const Post = {
  encode(message: Post, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== undefined) {
      writer.uint32(10).string(message.content);
    }
    if (message.image !== undefined) {
      Pointer.encode(message.image, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Post {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.content = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.image = Pointer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Post {
    return {
      content: isSet(object.content) ? String(object.content) : undefined,
      image: isSet(object.image) ? Pointer.fromJSON(object.image) : undefined,
    };
  },

  toJSON(message: Post): unknown {
    const obj: any = {};
    if (message.content !== undefined) {
      obj.content = message.content;
    }
    if (message.image !== undefined) {
      obj.image = Pointer.toJSON(message.image);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Post>, I>>(base?: I): Post {
    return Post.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Post>, I>>(object: I): Post {
    const message = createBasePost();
    message.content = object.content ?? undefined;
    message.image = (object.image !== undefined && object.image !== null)
      ? Pointer.fromPartial(object.image)
      : undefined;
    return message;
  },
};

function createBaseClaim(): Claim {
  return { claimType: Long.UZERO, claimFields: [] };
}

export const Claim = {
  encode(message: Claim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.claimType.isZero()) {
      writer.uint32(8).uint64(message.claimType);
    }
    for (const v of message.claimFields) {
      ClaimFieldEntry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Claim {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.claimType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.claimFields.push(ClaimFieldEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Claim {
    return {
      claimType: isSet(object.claimType) ? Long.fromValue(object.claimType) : Long.UZERO,
      claimFields: Array.isArray(object?.claimFields)
        ? object.claimFields.map((e: any) => ClaimFieldEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Claim): unknown {
    const obj: any = {};
    if (!message.claimType.isZero()) {
      obj.claimType = (message.claimType || Long.UZERO).toString();
    }
    if (message.claimFields?.length) {
      obj.claimFields = message.claimFields.map((e) => ClaimFieldEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Claim>, I>>(base?: I): Claim {
    return Claim.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Claim>, I>>(object: I): Claim {
    const message = createBaseClaim();
    message.claimType = (object.claimType !== undefined && object.claimType !== null)
      ? Long.fromValue(object.claimType)
      : Long.UZERO;
    message.claimFields = object.claimFields?.map((e) => ClaimFieldEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseClaimFieldEntry(): ClaimFieldEntry {
  return { key: Long.UZERO, value: "" };
}

export const ClaimFieldEntry = {
  encode(message: ClaimFieldEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.key.isZero()) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimFieldEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimFieldEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimFieldEntry {
    return {
      key: isSet(object.key) ? Long.fromValue(object.key) : Long.UZERO,
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: ClaimFieldEntry): unknown {
    const obj: any = {};
    if (!message.key.isZero()) {
      obj.key = (message.key || Long.UZERO).toString();
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClaimFieldEntry>, I>>(base?: I): ClaimFieldEntry {
    return ClaimFieldEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClaimFieldEntry>, I>>(object: I): ClaimFieldEntry {
    const message = createBaseClaimFieldEntry();
    message.key = (object.key !== undefined && object.key !== null) ? Long.fromValue(object.key) : Long.UZERO;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseVouch(): Vouch {
  return {};
}

export const Vouch = {
  encode(_: Vouch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vouch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVouch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Vouch {
    return {};
  },

  toJSON(_: Vouch): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Vouch>, I>>(base?: I): Vouch {
    return Vouch.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vouch>, I>>(_: I): Vouch {
    const message = createBaseVouch();
    return message;
  },
};

function createBaseStorageTypeProcessSecret(): StorageTypeProcessSecret {
  return { system: undefined, process: undefined };
}

export const StorageTypeProcessSecret = {
  encode(message: StorageTypeProcessSecret, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.system !== undefined) {
      PrivateKey.encode(message.system, writer.uint32(10).fork()).ldelim();
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageTypeProcessSecret {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageTypeProcessSecret();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.system = PrivateKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageTypeProcessSecret {
    return {
      system: isSet(object.system) ? PrivateKey.fromJSON(object.system) : undefined,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
    };
  },

  toJSON(message: StorageTypeProcessSecret): unknown {
    const obj: any = {};
    if (message.system !== undefined) {
      obj.system = PrivateKey.toJSON(message.system);
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageTypeProcessSecret>, I>>(base?: I): StorageTypeProcessSecret {
    return StorageTypeProcessSecret.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageTypeProcessSecret>, I>>(object: I): StorageTypeProcessSecret {
    const message = createBaseStorageTypeProcessSecret();
    message.system = (object.system !== undefined && object.system !== null)
      ? PrivateKey.fromPartial(object.system)
      : undefined;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    return message;
  },
};

function createBaseStorageTypeProcessState(): StorageTypeProcessState {
  return { logicalClock: Long.UZERO, ranges: [], indices: undefined };
}

export const StorageTypeProcessState = {
  encode(message: StorageTypeProcessState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.logicalClock.isZero()) {
      writer.uint32(8).uint64(message.logicalClock);
    }
    for (const v of message.ranges) {
      Range.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.indices !== undefined) {
      Indices.encode(message.indices, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageTypeProcessState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageTypeProcessState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.logicalClock = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ranges.push(Range.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.indices = Indices.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageTypeProcessState {
    return {
      logicalClock: isSet(object.logicalClock) ? Long.fromValue(object.logicalClock) : Long.UZERO,
      ranges: Array.isArray(object?.ranges) ? object.ranges.map((e: any) => Range.fromJSON(e)) : [],
      indices: isSet(object.indices) ? Indices.fromJSON(object.indices) : undefined,
    };
  },

  toJSON(message: StorageTypeProcessState): unknown {
    const obj: any = {};
    if (!message.logicalClock.isZero()) {
      obj.logicalClock = (message.logicalClock || Long.UZERO).toString();
    }
    if (message.ranges?.length) {
      obj.ranges = message.ranges.map((e) => Range.toJSON(e));
    }
    if (message.indices !== undefined) {
      obj.indices = Indices.toJSON(message.indices);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageTypeProcessState>, I>>(base?: I): StorageTypeProcessState {
    return StorageTypeProcessState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageTypeProcessState>, I>>(object: I): StorageTypeProcessState {
    const message = createBaseStorageTypeProcessState();
    message.logicalClock = (object.logicalClock !== undefined && object.logicalClock !== null)
      ? Long.fromValue(object.logicalClock)
      : Long.UZERO;
    message.ranges = object.ranges?.map((e) => Range.fromPartial(e)) || [];
    message.indices = (object.indices !== undefined && object.indices !== null)
      ? Indices.fromPartial(object.indices)
      : undefined;
    return message;
  },
};

function createBaseStorageTypeCRDTSetItem(): StorageTypeCRDTSetItem {
  return { contentType: Long.UZERO, value: new Uint8Array(0), unixMilliseconds: Long.UZERO, operation: 0 };
}

export const StorageTypeCRDTSetItem = {
  encode(message: StorageTypeCRDTSetItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.contentType.isZero()) {
      writer.uint32(8).uint64(message.contentType);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      writer.uint32(24).uint64(message.unixMilliseconds);
    }
    if (message.operation !== 0) {
      writer.uint32(32).int32(message.operation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageTypeCRDTSetItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageTypeCRDTSetItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.contentType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.unixMilliseconds = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.operation = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageTypeCRDTSetItem {
    return {
      contentType: isSet(object.contentType) ? Long.fromValue(object.contentType) : Long.UZERO,
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      unixMilliseconds: isSet(object.unixMilliseconds) ? Long.fromValue(object.unixMilliseconds) : Long.UZERO,
      operation: isSet(object.operation) ? lWWElementSet_OperationFromJSON(object.operation) : 0,
    };
  },

  toJSON(message: StorageTypeCRDTSetItem): unknown {
    const obj: any = {};
    if (!message.contentType.isZero()) {
      obj.contentType = (message.contentType || Long.UZERO).toString();
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      obj.unixMilliseconds = (message.unixMilliseconds || Long.UZERO).toString();
    }
    if (message.operation !== 0) {
      obj.operation = lWWElementSet_OperationToJSON(message.operation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageTypeCRDTSetItem>, I>>(base?: I): StorageTypeCRDTSetItem {
    return StorageTypeCRDTSetItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageTypeCRDTSetItem>, I>>(object: I): StorageTypeCRDTSetItem {
    const message = createBaseStorageTypeCRDTSetItem();
    message.contentType = (object.contentType !== undefined && object.contentType !== null)
      ? Long.fromValue(object.contentType)
      : Long.UZERO;
    message.value = object.value ?? new Uint8Array(0);
    message.unixMilliseconds = (object.unixMilliseconds !== undefined && object.unixMilliseconds !== null)
      ? Long.fromValue(object.unixMilliseconds)
      : Long.UZERO;
    message.operation = object.operation ?? 0;
    return message;
  },
};

function createBaseStorageTypeCRDTItem(): StorageTypeCRDTItem {
  return { contentType: Long.UZERO, value: new Uint8Array(0), unixMilliseconds: Long.UZERO };
}

export const StorageTypeCRDTItem = {
  encode(message: StorageTypeCRDTItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.contentType.isZero()) {
      writer.uint32(8).uint64(message.contentType);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      writer.uint32(24).uint64(message.unixMilliseconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageTypeCRDTItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageTypeCRDTItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.contentType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.unixMilliseconds = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageTypeCRDTItem {
    return {
      contentType: isSet(object.contentType) ? Long.fromValue(object.contentType) : Long.UZERO,
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      unixMilliseconds: isSet(object.unixMilliseconds) ? Long.fromValue(object.unixMilliseconds) : Long.UZERO,
    };
  },

  toJSON(message: StorageTypeCRDTItem): unknown {
    const obj: any = {};
    if (!message.contentType.isZero()) {
      obj.contentType = (message.contentType || Long.UZERO).toString();
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (!message.unixMilliseconds.isZero()) {
      obj.unixMilliseconds = (message.unixMilliseconds || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageTypeCRDTItem>, I>>(base?: I): StorageTypeCRDTItem {
    return StorageTypeCRDTItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageTypeCRDTItem>, I>>(object: I): StorageTypeCRDTItem {
    const message = createBaseStorageTypeCRDTItem();
    message.contentType = (object.contentType !== undefined && object.contentType !== null)
      ? Long.fromValue(object.contentType)
      : Long.UZERO;
    message.value = object.value ?? new Uint8Array(0);
    message.unixMilliseconds = (object.unixMilliseconds !== undefined && object.unixMilliseconds !== null)
      ? Long.fromValue(object.unixMilliseconds)
      : Long.UZERO;
    return message;
  },
};

function createBaseStorageTypeSystemState(): StorageTypeSystemState {
  return { processes: [], crdtItems: [] };
}

export const StorageTypeSystemState = {
  encode(message: StorageTypeSystemState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.processes) {
      Process.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.crdtItems) {
      StorageTypeCRDTItem.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageTypeSystemState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageTypeSystemState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.processes.push(Process.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.crdtItems.push(StorageTypeCRDTItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageTypeSystemState {
    return {
      processes: Array.isArray(object?.processes) ? object.processes.map((e: any) => Process.fromJSON(e)) : [],
      crdtItems: Array.isArray(object?.crdtItems)
        ? object.crdtItems.map((e: any) => StorageTypeCRDTItem.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StorageTypeSystemState): unknown {
    const obj: any = {};
    if (message.processes?.length) {
      obj.processes = message.processes.map((e) => Process.toJSON(e));
    }
    if (message.crdtItems?.length) {
      obj.crdtItems = message.crdtItems.map((e) => StorageTypeCRDTItem.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageTypeSystemState>, I>>(base?: I): StorageTypeSystemState {
    return StorageTypeSystemState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageTypeSystemState>, I>>(object: I): StorageTypeSystemState {
    const message = createBaseStorageTypeSystemState();
    message.processes = object.processes?.map((e) => Process.fromPartial(e)) || [];
    message.crdtItems = object.crdtItems?.map((e) => StorageTypeCRDTItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorageTypeEvent(): StorageTypeEvent {
  return { event: undefined, mutationPointer: undefined };
}

export const StorageTypeEvent = {
  encode(message: StorageTypeEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.event !== undefined) {
      SignedEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    if (message.mutationPointer !== undefined) {
      Pointer.encode(message.mutationPointer, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageTypeEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageTypeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.event = SignedEvent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mutationPointer = Pointer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageTypeEvent {
    return {
      event: isSet(object.event) ? SignedEvent.fromJSON(object.event) : undefined,
      mutationPointer: isSet(object.mutationPointer) ? Pointer.fromJSON(object.mutationPointer) : undefined,
    };
  },

  toJSON(message: StorageTypeEvent): unknown {
    const obj: any = {};
    if (message.event !== undefined) {
      obj.event = SignedEvent.toJSON(message.event);
    }
    if (message.mutationPointer !== undefined) {
      obj.mutationPointer = Pointer.toJSON(message.mutationPointer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageTypeEvent>, I>>(base?: I): StorageTypeEvent {
    return StorageTypeEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageTypeEvent>, I>>(object: I): StorageTypeEvent {
    const message = createBaseStorageTypeEvent();
    message.event = (object.event !== undefined && object.event !== null)
      ? SignedEvent.fromPartial(object.event)
      : undefined;
    message.mutationPointer = (object.mutationPointer !== undefined && object.mutationPointer !== null)
      ? Pointer.fromPartial(object.mutationPointer)
      : undefined;
    return message;
  },
};

function createBaseRepeatedUInt64(): RepeatedUInt64 {
  return { numbers: [] };
}

export const RepeatedUInt64 = {
  encode(message: RepeatedUInt64, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.numbers) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepeatedUInt64 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepeatedUInt64();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.numbers.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.numbers.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RepeatedUInt64 {
    return { numbers: Array.isArray(object?.numbers) ? object.numbers.map((e: any) => Long.fromValue(e)) : [] };
  },

  toJSON(message: RepeatedUInt64): unknown {
    const obj: any = {};
    if (message.numbers?.length) {
      obj.numbers = message.numbers.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RepeatedUInt64>, I>>(base?: I): RepeatedUInt64 {
    return RepeatedUInt64.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RepeatedUInt64>, I>>(object: I): RepeatedUInt64 {
    const message = createBaseRepeatedUInt64();
    message.numbers = object.numbers?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseQueryReferencesRequest(): QueryReferencesRequest {
  return {
    reference: undefined,
    cursor: undefined,
    requestEvents: undefined,
    countLwwElementReferences: [],
    countReferences: [],
  };
}

export const QueryReferencesRequest = {
  encode(message: QueryReferencesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reference !== undefined) {
      Reference.encode(message.reference, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== undefined) {
      writer.uint32(18).bytes(message.cursor);
    }
    if (message.requestEvents !== undefined) {
      QueryReferencesRequestEvents.encode(message.requestEvents, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.countLwwElementReferences) {
      QueryReferencesRequestCountLWWElementReferences.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.countReferences) {
      QueryReferencesRequestCountReferences.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReferencesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferencesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reference = Reference.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.requestEvents = QueryReferencesRequestEvents.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.countLwwElementReferences.push(
            QueryReferencesRequestCountLWWElementReferences.decode(reader, reader.uint32()),
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.countReferences.push(QueryReferencesRequestCountReferences.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryReferencesRequest {
    return {
      reference: isSet(object.reference) ? Reference.fromJSON(object.reference) : undefined,
      cursor: isSet(object.cursor) ? bytesFromBase64(object.cursor) : undefined,
      requestEvents: isSet(object.requestEvents)
        ? QueryReferencesRequestEvents.fromJSON(object.requestEvents)
        : undefined,
      countLwwElementReferences: Array.isArray(object?.countLwwElementReferences)
        ? object.countLwwElementReferences.map((e: any) => QueryReferencesRequestCountLWWElementReferences.fromJSON(e))
        : [],
      countReferences: Array.isArray(object?.countReferences)
        ? object.countReferences.map((e: any) => QueryReferencesRequestCountReferences.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryReferencesRequest): unknown {
    const obj: any = {};
    if (message.reference !== undefined) {
      obj.reference = Reference.toJSON(message.reference);
    }
    if (message.cursor !== undefined) {
      obj.cursor = base64FromBytes(message.cursor);
    }
    if (message.requestEvents !== undefined) {
      obj.requestEvents = QueryReferencesRequestEvents.toJSON(message.requestEvents);
    }
    if (message.countLwwElementReferences?.length) {
      obj.countLwwElementReferences = message.countLwwElementReferences.map((e) =>
        QueryReferencesRequestCountLWWElementReferences.toJSON(e)
      );
    }
    if (message.countReferences?.length) {
      obj.countReferences = message.countReferences.map((e) => QueryReferencesRequestCountReferences.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryReferencesRequest>, I>>(base?: I): QueryReferencesRequest {
    return QueryReferencesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryReferencesRequest>, I>>(object: I): QueryReferencesRequest {
    const message = createBaseQueryReferencesRequest();
    message.reference = (object.reference !== undefined && object.reference !== null)
      ? Reference.fromPartial(object.reference)
      : undefined;
    message.cursor = object.cursor ?? undefined;
    message.requestEvents = (object.requestEvents !== undefined && object.requestEvents !== null)
      ? QueryReferencesRequestEvents.fromPartial(object.requestEvents)
      : undefined;
    message.countLwwElementReferences =
      object.countLwwElementReferences?.map((e) => QueryReferencesRequestCountLWWElementReferences.fromPartial(e)) ||
      [];
    message.countReferences =
      object.countReferences?.map((e) => QueryReferencesRequestCountReferences.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryReferencesRequestEvents(): QueryReferencesRequestEvents {
  return { fromType: undefined, countLwwElementReferences: [], countReferences: [] };
}

export const QueryReferencesRequestEvents = {
  encode(message: QueryReferencesRequestEvents, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromType !== undefined) {
      writer.uint32(8).uint64(message.fromType);
    }
    for (const v of message.countLwwElementReferences) {
      QueryReferencesRequestCountLWWElementReferences.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.countReferences) {
      QueryReferencesRequestCountReferences.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReferencesRequestEvents {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferencesRequestEvents();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fromType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.countLwwElementReferences.push(
            QueryReferencesRequestCountLWWElementReferences.decode(reader, reader.uint32()),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.countReferences.push(QueryReferencesRequestCountReferences.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryReferencesRequestEvents {
    return {
      fromType: isSet(object.fromType) ? Long.fromValue(object.fromType) : undefined,
      countLwwElementReferences: Array.isArray(object?.countLwwElementReferences)
        ? object.countLwwElementReferences.map((e: any) => QueryReferencesRequestCountLWWElementReferences.fromJSON(e))
        : [],
      countReferences: Array.isArray(object?.countReferences)
        ? object.countReferences.map((e: any) => QueryReferencesRequestCountReferences.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryReferencesRequestEvents): unknown {
    const obj: any = {};
    if (message.fromType !== undefined) {
      obj.fromType = (message.fromType || Long.UZERO).toString();
    }
    if (message.countLwwElementReferences?.length) {
      obj.countLwwElementReferences = message.countLwwElementReferences.map((e) =>
        QueryReferencesRequestCountLWWElementReferences.toJSON(e)
      );
    }
    if (message.countReferences?.length) {
      obj.countReferences = message.countReferences.map((e) => QueryReferencesRequestCountReferences.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryReferencesRequestEvents>, I>>(base?: I): QueryReferencesRequestEvents {
    return QueryReferencesRequestEvents.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryReferencesRequestEvents>, I>>(object: I): QueryReferencesRequestEvents {
    const message = createBaseQueryReferencesRequestEvents();
    message.fromType = (object.fromType !== undefined && object.fromType !== null)
      ? Long.fromValue(object.fromType)
      : undefined;
    message.countLwwElementReferences =
      object.countLwwElementReferences?.map((e) => QueryReferencesRequestCountLWWElementReferences.fromPartial(e)) ||
      [];
    message.countReferences =
      object.countReferences?.map((e) => QueryReferencesRequestCountReferences.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryReferencesRequestCountLWWElementReferences(): QueryReferencesRequestCountLWWElementReferences {
  return { value: new Uint8Array(0), fromType: undefined };
}

export const QueryReferencesRequestCountLWWElementReferences = {
  encode(
    message: QueryReferencesRequestCountLWWElementReferences,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    if (message.fromType !== undefined) {
      writer.uint32(16).uint64(message.fromType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReferencesRequestCountLWWElementReferences {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferencesRequestCountLWWElementReferences();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.fromType = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryReferencesRequestCountLWWElementReferences {
    return {
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      fromType: isSet(object.fromType) ? Long.fromValue(object.fromType) : undefined,
    };
  },

  toJSON(message: QueryReferencesRequestCountLWWElementReferences): unknown {
    const obj: any = {};
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.fromType !== undefined) {
      obj.fromType = (message.fromType || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryReferencesRequestCountLWWElementReferences>, I>>(
    base?: I,
  ): QueryReferencesRequestCountLWWElementReferences {
    return QueryReferencesRequestCountLWWElementReferences.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryReferencesRequestCountLWWElementReferences>, I>>(
    object: I,
  ): QueryReferencesRequestCountLWWElementReferences {
    const message = createBaseQueryReferencesRequestCountLWWElementReferences();
    message.value = object.value ?? new Uint8Array(0);
    message.fromType = (object.fromType !== undefined && object.fromType !== null)
      ? Long.fromValue(object.fromType)
      : undefined;
    return message;
  },
};

function createBaseQueryReferencesRequestCountReferences(): QueryReferencesRequestCountReferences {
  return { fromType: undefined };
}

export const QueryReferencesRequestCountReferences = {
  encode(message: QueryReferencesRequestCountReferences, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromType !== undefined) {
      writer.uint32(8).uint64(message.fromType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReferencesRequestCountReferences {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferencesRequestCountReferences();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fromType = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryReferencesRequestCountReferences {
    return { fromType: isSet(object.fromType) ? Long.fromValue(object.fromType) : undefined };
  },

  toJSON(message: QueryReferencesRequestCountReferences): unknown {
    const obj: any = {};
    if (message.fromType !== undefined) {
      obj.fromType = (message.fromType || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryReferencesRequestCountReferences>, I>>(
    base?: I,
  ): QueryReferencesRequestCountReferences {
    return QueryReferencesRequestCountReferences.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryReferencesRequestCountReferences>, I>>(
    object: I,
  ): QueryReferencesRequestCountReferences {
    const message = createBaseQueryReferencesRequestCountReferences();
    message.fromType = (object.fromType !== undefined && object.fromType !== null)
      ? Long.fromValue(object.fromType)
      : undefined;
    return message;
  },
};

function createBaseQueryReferencesResponseEventItem(): QueryReferencesResponseEventItem {
  return { event: undefined, counts: [] };
}

export const QueryReferencesResponseEventItem = {
  encode(message: QueryReferencesResponseEventItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.event !== undefined) {
      SignedEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.counts) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReferencesResponseEventItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferencesResponseEventItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.event = SignedEvent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag === 16) {
            message.counts.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.counts.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryReferencesResponseEventItem {
    return {
      event: isSet(object.event) ? SignedEvent.fromJSON(object.event) : undefined,
      counts: Array.isArray(object?.counts) ? object.counts.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: QueryReferencesResponseEventItem): unknown {
    const obj: any = {};
    if (message.event !== undefined) {
      obj.event = SignedEvent.toJSON(message.event);
    }
    if (message.counts?.length) {
      obj.counts = message.counts.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryReferencesResponseEventItem>, I>>(
    base?: I,
  ): QueryReferencesResponseEventItem {
    return QueryReferencesResponseEventItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryReferencesResponseEventItem>, I>>(
    object: I,
  ): QueryReferencesResponseEventItem {
    const message = createBaseQueryReferencesResponseEventItem();
    message.event = (object.event !== undefined && object.event !== null)
      ? SignedEvent.fromPartial(object.event)
      : undefined;
    message.counts = object.counts?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseQueryReferencesResponse(): QueryReferencesResponse {
  return { items: [], relatedEvents: [], cursor: undefined, counts: [] };
}

export const QueryReferencesResponse = {
  encode(message: QueryReferencesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      QueryReferencesResponseEventItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.relatedEvents) {
      SignedEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== undefined) {
      writer.uint32(26).bytes(message.cursor);
    }
    writer.uint32(34).fork();
    for (const v of message.counts) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReferencesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferencesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(QueryReferencesResponseEventItem.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.relatedEvents.push(SignedEvent.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.bytes();
          continue;
        case 4:
          if (tag === 32) {
            message.counts.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.counts.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryReferencesResponse {
    return {
      items: Array.isArray(object?.items)
        ? object.items.map((e: any) => QueryReferencesResponseEventItem.fromJSON(e))
        : [],
      relatedEvents: Array.isArray(object?.relatedEvents)
        ? object.relatedEvents.map((e: any) => SignedEvent.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? bytesFromBase64(object.cursor) : undefined,
      counts: Array.isArray(object?.counts) ? object.counts.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: QueryReferencesResponse): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => QueryReferencesResponseEventItem.toJSON(e));
    }
    if (message.relatedEvents?.length) {
      obj.relatedEvents = message.relatedEvents.map((e) => SignedEvent.toJSON(e));
    }
    if (message.cursor !== undefined) {
      obj.cursor = base64FromBytes(message.cursor);
    }
    if (message.counts?.length) {
      obj.counts = message.counts.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryReferencesResponse>, I>>(base?: I): QueryReferencesResponse {
    return QueryReferencesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryReferencesResponse>, I>>(object: I): QueryReferencesResponse {
    const message = createBaseQueryReferencesResponse();
    message.items = object.items?.map((e) => QueryReferencesResponseEventItem.fromPartial(e)) || [];
    message.relatedEvents = object.relatedEvents?.map((e) => SignedEvent.fromPartial(e)) || [];
    message.cursor = object.cursor ?? undefined;
    message.counts = object.counts?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseQueryClaimToSystemRequest(): QueryClaimToSystemRequest {
  return { claimType: Long.UZERO, trustRoot: undefined, matchAnyField: undefined, matchAllFields: undefined };
}

export const QueryClaimToSystemRequest = {
  encode(message: QueryClaimToSystemRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.claimType.isZero()) {
      writer.uint32(8).uint64(message.claimType);
    }
    if (message.trustRoot !== undefined) {
      PublicKey.encode(message.trustRoot, writer.uint32(18).fork()).ldelim();
    }
    if (message.matchAnyField !== undefined) {
      writer.uint32(26).string(message.matchAnyField);
    }
    if (message.matchAllFields !== undefined) {
      QueryClaimToSystemRequestMatchAll.encode(message.matchAllFields, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClaimToSystemRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClaimToSystemRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.claimType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.trustRoot = PublicKey.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.matchAnyField = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.matchAllFields = QueryClaimToSystemRequestMatchAll.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClaimToSystemRequest {
    return {
      claimType: isSet(object.claimType) ? Long.fromValue(object.claimType) : Long.UZERO,
      trustRoot: isSet(object.trustRoot) ? PublicKey.fromJSON(object.trustRoot) : undefined,
      matchAnyField: isSet(object.matchAnyField) ? String(object.matchAnyField) : undefined,
      matchAllFields: isSet(object.matchAllFields)
        ? QueryClaimToSystemRequestMatchAll.fromJSON(object.matchAllFields)
        : undefined,
    };
  },

  toJSON(message: QueryClaimToSystemRequest): unknown {
    const obj: any = {};
    if (!message.claimType.isZero()) {
      obj.claimType = (message.claimType || Long.UZERO).toString();
    }
    if (message.trustRoot !== undefined) {
      obj.trustRoot = PublicKey.toJSON(message.trustRoot);
    }
    if (message.matchAnyField !== undefined) {
      obj.matchAnyField = message.matchAnyField;
    }
    if (message.matchAllFields !== undefined) {
      obj.matchAllFields = QueryClaimToSystemRequestMatchAll.toJSON(message.matchAllFields);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClaimToSystemRequest>, I>>(base?: I): QueryClaimToSystemRequest {
    return QueryClaimToSystemRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClaimToSystemRequest>, I>>(object: I): QueryClaimToSystemRequest {
    const message = createBaseQueryClaimToSystemRequest();
    message.claimType = (object.claimType !== undefined && object.claimType !== null)
      ? Long.fromValue(object.claimType)
      : Long.UZERO;
    message.trustRoot = (object.trustRoot !== undefined && object.trustRoot !== null)
      ? PublicKey.fromPartial(object.trustRoot)
      : undefined;
    message.matchAnyField = object.matchAnyField ?? undefined;
    message.matchAllFields = (object.matchAllFields !== undefined && object.matchAllFields !== null)
      ? QueryClaimToSystemRequestMatchAll.fromPartial(object.matchAllFields)
      : undefined;
    return message;
  },
};

function createBaseQueryClaimToSystemRequestMatchAll(): QueryClaimToSystemRequestMatchAll {
  return { fields: [] };
}

export const QueryClaimToSystemRequestMatchAll = {
  encode(message: QueryClaimToSystemRequestMatchAll, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.fields) {
      ClaimFieldEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClaimToSystemRequestMatchAll {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClaimToSystemRequestMatchAll();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields.push(ClaimFieldEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClaimToSystemRequestMatchAll {
    return { fields: Array.isArray(object?.fields) ? object.fields.map((e: any) => ClaimFieldEntry.fromJSON(e)) : [] };
  },

  toJSON(message: QueryClaimToSystemRequestMatchAll): unknown {
    const obj: any = {};
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => ClaimFieldEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClaimToSystemRequestMatchAll>, I>>(
    base?: I,
  ): QueryClaimToSystemRequestMatchAll {
    return QueryClaimToSystemRequestMatchAll.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClaimToSystemRequestMatchAll>, I>>(
    object: I,
  ): QueryClaimToSystemRequestMatchAll {
    const message = createBaseQueryClaimToSystemRequestMatchAll();
    message.fields = object.fields?.map((e) => ClaimFieldEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryClaimToSystemResponse(): QueryClaimToSystemResponse {
  return { matches: [] };
}

export const QueryClaimToSystemResponse = {
  encode(message: QueryClaimToSystemResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.matches) {
      QueryClaimToSystemResponseMatch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClaimToSystemResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClaimToSystemResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.matches.push(QueryClaimToSystemResponseMatch.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClaimToSystemResponse {
    return {
      matches: Array.isArray(object?.matches)
        ? object.matches.map((e: any) => QueryClaimToSystemResponseMatch.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryClaimToSystemResponse): unknown {
    const obj: any = {};
    if (message.matches?.length) {
      obj.matches = message.matches.map((e) => QueryClaimToSystemResponseMatch.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClaimToSystemResponse>, I>>(base?: I): QueryClaimToSystemResponse {
    return QueryClaimToSystemResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClaimToSystemResponse>, I>>(object: I): QueryClaimToSystemResponse {
    const message = createBaseQueryClaimToSystemResponse();
    message.matches = object.matches?.map((e) => QueryClaimToSystemResponseMatch.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryClaimToSystemResponseMatch(): QueryClaimToSystemResponseMatch {
  return { claim: undefined, proofChain: [] };
}

export const QueryClaimToSystemResponseMatch = {
  encode(message: QueryClaimToSystemResponseMatch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.claim !== undefined) {
      SignedEvent.encode(message.claim, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.proofChain) {
      SignedEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClaimToSystemResponseMatch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClaimToSystemResponseMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.claim = SignedEvent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proofChain.push(SignedEvent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClaimToSystemResponseMatch {
    return {
      claim: isSet(object.claim) ? SignedEvent.fromJSON(object.claim) : undefined,
      proofChain: Array.isArray(object?.proofChain) ? object.proofChain.map((e: any) => SignedEvent.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryClaimToSystemResponseMatch): unknown {
    const obj: any = {};
    if (message.claim !== undefined) {
      obj.claim = SignedEvent.toJSON(message.claim);
    }
    if (message.proofChain?.length) {
      obj.proofChain = message.proofChain.map((e) => SignedEvent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClaimToSystemResponseMatch>, I>>(base?: I): QueryClaimToSystemResponseMatch {
    return QueryClaimToSystemResponseMatch.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClaimToSystemResponseMatch>, I>>(
    object: I,
  ): QueryClaimToSystemResponseMatch {
    const message = createBaseQueryClaimToSystemResponseMatch();
    message.claim = (object.claim !== undefined && object.claim !== null)
      ? SignedEvent.fromPartial(object.claim)
      : undefined;
    message.proofChain = object.proofChain?.map((e) => SignedEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryIndexResponse(): QueryIndexResponse {
  return { events: [], proof: [] };
}

export const QueryIndexResponse = {
  encode(message: QueryIndexResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.events) {
      SignedEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.proof) {
      SignedEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIndexResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIndexResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events.push(SignedEvent.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof.push(SignedEvent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIndexResponse {
    return {
      events: Array.isArray(object?.events) ? object.events.map((e: any) => SignedEvent.fromJSON(e)) : [],
      proof: Array.isArray(object?.proof) ? object.proof.map((e: any) => SignedEvent.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryIndexResponse): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => SignedEvent.toJSON(e));
    }
    if (message.proof?.length) {
      obj.proof = message.proof.map((e) => SignedEvent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIndexResponse>, I>>(base?: I): QueryIndexResponse {
    return QueryIndexResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIndexResponse>, I>>(object: I): QueryIndexResponse {
    const message = createBaseQueryIndexResponse();
    message.events = object.events?.map((e) => SignedEvent.fromPartial(e)) || [];
    message.proof = object.proof?.map((e) => SignedEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseURLInfo(): URLInfo {
  return { urlType: Long.UZERO, body: new Uint8Array(0) };
}

export const URLInfo = {
  encode(message: URLInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.urlType.isZero()) {
      writer.uint32(8).uint64(message.urlType);
    }
    if (message.body.length !== 0) {
      writer.uint32(18).bytes(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): URLInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseURLInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.urlType = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): URLInfo {
    return {
      urlType: isSet(object.urlType) ? Long.fromValue(object.urlType) : Long.UZERO,
      body: isSet(object.body) ? bytesFromBase64(object.body) : new Uint8Array(0),
    };
  },

  toJSON(message: URLInfo): unknown {
    const obj: any = {};
    if (!message.urlType.isZero()) {
      obj.urlType = (message.urlType || Long.UZERO).toString();
    }
    if (message.body.length !== 0) {
      obj.body = base64FromBytes(message.body);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<URLInfo>, I>>(base?: I): URLInfo {
    return URLInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<URLInfo>, I>>(object: I): URLInfo {
    const message = createBaseURLInfo();
    message.urlType = (object.urlType !== undefined && object.urlType !== null)
      ? Long.fromValue(object.urlType)
      : Long.UZERO;
    message.body = object.body ?? new Uint8Array(0);
    return message;
  },
};

function createBaseURLInfoSystemLink(): URLInfoSystemLink {
  return { system: undefined, servers: [] };
}

export const URLInfoSystemLink = {
  encode(message: URLInfoSystemLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.system !== undefined) {
      PublicKey.encode(message.system, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.servers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): URLInfoSystemLink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseURLInfoSystemLink();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.system = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.servers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): URLInfoSystemLink {
    return {
      system: isSet(object.system) ? PublicKey.fromJSON(object.system) : undefined,
      servers: Array.isArray(object?.servers) ? object.servers.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: URLInfoSystemLink): unknown {
    const obj: any = {};
    if (message.system !== undefined) {
      obj.system = PublicKey.toJSON(message.system);
    }
    if (message.servers?.length) {
      obj.servers = message.servers;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<URLInfoSystemLink>, I>>(base?: I): URLInfoSystemLink {
    return URLInfoSystemLink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<URLInfoSystemLink>, I>>(object: I): URLInfoSystemLink {
    const message = createBaseURLInfoSystemLink();
    message.system = (object.system !== undefined && object.system !== null)
      ? PublicKey.fromPartial(object.system)
      : undefined;
    message.servers = object.servers?.map((e) => e) || [];
    return message;
  },
};

function createBaseURLInfoEventLink(): URLInfoEventLink {
  return { system: undefined, process: undefined, logicalClock: Long.UZERO, servers: [] };
}

export const URLInfoEventLink = {
  encode(message: URLInfoEventLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.system !== undefined) {
      PublicKey.encode(message.system, writer.uint32(10).fork()).ldelim();
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(18).fork()).ldelim();
    }
    if (!message.logicalClock.isZero()) {
      writer.uint32(24).uint64(message.logicalClock);
    }
    for (const v of message.servers) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): URLInfoEventLink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseURLInfoEventLink();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.system = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.logicalClock = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.servers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): URLInfoEventLink {
    return {
      system: isSet(object.system) ? PublicKey.fromJSON(object.system) : undefined,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      logicalClock: isSet(object.logicalClock) ? Long.fromValue(object.logicalClock) : Long.UZERO,
      servers: Array.isArray(object?.servers) ? object.servers.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: URLInfoEventLink): unknown {
    const obj: any = {};
    if (message.system !== undefined) {
      obj.system = PublicKey.toJSON(message.system);
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (!message.logicalClock.isZero()) {
      obj.logicalClock = (message.logicalClock || Long.UZERO).toString();
    }
    if (message.servers?.length) {
      obj.servers = message.servers;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<URLInfoEventLink>, I>>(base?: I): URLInfoEventLink {
    return URLInfoEventLink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<URLInfoEventLink>, I>>(object: I): URLInfoEventLink {
    const message = createBaseURLInfoEventLink();
    message.system = (object.system !== undefined && object.system !== null)
      ? PublicKey.fromPartial(object.system)
      : undefined;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.logicalClock = (object.logicalClock !== undefined && object.logicalClock !== null)
      ? Long.fromValue(object.logicalClock)
      : Long.UZERO;
    message.servers = object.servers?.map((e) => e) || [];
    return message;
  },
};

function createBaseURLInfoDataLink(): URLInfoDataLink {
  return { system: undefined, process: undefined, servers: [], byteCount: Long.UZERO, sections: [], mime: undefined };
}

export const URLInfoDataLink = {
  encode(message: URLInfoDataLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.system !== undefined) {
      PublicKey.encode(message.system, writer.uint32(10).fork()).ldelim();
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.servers) {
      writer.uint32(26).string(v!);
    }
    if (!message.byteCount.isZero()) {
      writer.uint32(32).uint64(message.byteCount);
    }
    for (const v of message.sections) {
      Range.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.mime !== undefined) {
      writer.uint32(50).string(message.mime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): URLInfoDataLink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseURLInfoDataLink();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.system = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.servers.push(reader.string());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.byteCount = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sections.push(Range.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.mime = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): URLInfoDataLink {
    return {
      system: isSet(object.system) ? PublicKey.fromJSON(object.system) : undefined,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      servers: Array.isArray(object?.servers) ? object.servers.map((e: any) => String(e)) : [],
      byteCount: isSet(object.byteCount) ? Long.fromValue(object.byteCount) : Long.UZERO,
      sections: Array.isArray(object?.sections) ? object.sections.map((e: any) => Range.fromJSON(e)) : [],
      mime: isSet(object.mime) ? String(object.mime) : undefined,
    };
  },

  toJSON(message: URLInfoDataLink): unknown {
    const obj: any = {};
    if (message.system !== undefined) {
      obj.system = PublicKey.toJSON(message.system);
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (message.servers?.length) {
      obj.servers = message.servers;
    }
    if (!message.byteCount.isZero()) {
      obj.byteCount = (message.byteCount || Long.UZERO).toString();
    }
    if (message.sections?.length) {
      obj.sections = message.sections.map((e) => Range.toJSON(e));
    }
    if (message.mime !== undefined) {
      obj.mime = message.mime;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<URLInfoDataLink>, I>>(base?: I): URLInfoDataLink {
    return URLInfoDataLink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<URLInfoDataLink>, I>>(object: I): URLInfoDataLink {
    const message = createBaseURLInfoDataLink();
    message.system = (object.system !== undefined && object.system !== null)
      ? PublicKey.fromPartial(object.system)
      : undefined;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.servers = object.servers?.map((e) => e) || [];
    message.byteCount = (object.byteCount !== undefined && object.byteCount !== null)
      ? Long.fromValue(object.byteCount)
      : Long.UZERO;
    message.sections = object.sections?.map((e) => Range.fromPartial(e)) || [];
    message.mime = object.mime ?? undefined;
    return message;
  },
};

function createBaseHarborChallengeResponse(): HarborChallengeResponse {
  return { body: new Uint8Array(0), hmac: new Uint8Array(0) };
}

export const HarborChallengeResponse = {
  encode(message: HarborChallengeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body.length !== 0) {
      writer.uint32(10).bytes(message.body);
    }
    if (message.hmac.length !== 0) {
      writer.uint32(18).bytes(message.hmac);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HarborChallengeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHarborChallengeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.body = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hmac = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HarborChallengeResponse {
    return {
      body: isSet(object.body) ? bytesFromBase64(object.body) : new Uint8Array(0),
      hmac: isSet(object.hmac) ? bytesFromBase64(object.hmac) : new Uint8Array(0),
    };
  },

  toJSON(message: HarborChallengeResponse): unknown {
    const obj: any = {};
    if (message.body.length !== 0) {
      obj.body = base64FromBytes(message.body);
    }
    if (message.hmac.length !== 0) {
      obj.hmac = base64FromBytes(message.hmac);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HarborChallengeResponse>, I>>(base?: I): HarborChallengeResponse {
    return HarborChallengeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HarborChallengeResponse>, I>>(object: I): HarborChallengeResponse {
    const message = createBaseHarborChallengeResponse();
    message.body = object.body ?? new Uint8Array(0);
    message.hmac = object.hmac ?? new Uint8Array(0);
    return message;
  },
};

function createBaseHarborChallengeResponseBody(): HarborChallengeResponseBody {
  return { challenge: new Uint8Array(0), createdOn: Long.UZERO };
}

export const HarborChallengeResponseBody = {
  encode(message: HarborChallengeResponseBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.challenge.length !== 0) {
      writer.uint32(10).bytes(message.challenge);
    }
    if (!message.createdOn.isZero()) {
      writer.uint32(16).uint64(message.createdOn);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HarborChallengeResponseBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHarborChallengeResponseBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.challenge = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.createdOn = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HarborChallengeResponseBody {
    return {
      challenge: isSet(object.challenge) ? bytesFromBase64(object.challenge) : new Uint8Array(0),
      createdOn: isSet(object.createdOn) ? Long.fromValue(object.createdOn) : Long.UZERO,
    };
  },

  toJSON(message: HarborChallengeResponseBody): unknown {
    const obj: any = {};
    if (message.challenge.length !== 0) {
      obj.challenge = base64FromBytes(message.challenge);
    }
    if (!message.createdOn.isZero()) {
      obj.createdOn = (message.createdOn || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HarborChallengeResponseBody>, I>>(base?: I): HarborChallengeResponseBody {
    return HarborChallengeResponseBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HarborChallengeResponseBody>, I>>(object: I): HarborChallengeResponseBody {
    const message = createBaseHarborChallengeResponseBody();
    message.challenge = object.challenge ?? new Uint8Array(0);
    message.createdOn = (object.createdOn !== undefined && object.createdOn !== null)
      ? Long.fromValue(object.createdOn)
      : Long.UZERO;
    return message;
  },
};

function createBaseHarborValidateRequest(): HarborValidateRequest {
  return { challenge: undefined, system: undefined, signature: new Uint8Array(0) };
}

export const HarborValidateRequest = {
  encode(message: HarborValidateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.challenge !== undefined) {
      HarborChallengeResponse.encode(message.challenge, writer.uint32(10).fork()).ldelim();
    }
    if (message.system !== undefined) {
      PublicKey.encode(message.system, writer.uint32(18).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(26).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HarborValidateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHarborValidateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.challenge = HarborChallengeResponse.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.system = PublicKey.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HarborValidateRequest {
    return {
      challenge: isSet(object.challenge) ? HarborChallengeResponse.fromJSON(object.challenge) : undefined,
      system: isSet(object.system) ? PublicKey.fromJSON(object.system) : undefined,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
    };
  },

  toJSON(message: HarborValidateRequest): unknown {
    const obj: any = {};
    if (message.challenge !== undefined) {
      obj.challenge = HarborChallengeResponse.toJSON(message.challenge);
    }
    if (message.system !== undefined) {
      obj.system = PublicKey.toJSON(message.system);
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HarborValidateRequest>, I>>(base?: I): HarborValidateRequest {
    return HarborValidateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HarborValidateRequest>, I>>(object: I): HarborValidateRequest {
    const message = createBaseHarborValidateRequest();
    message.challenge = (object.challenge !== undefined && object.challenge !== null)
      ? HarborChallengeResponse.fromPartial(object.challenge)
      : undefined;
    message.system = (object.system !== undefined && object.system !== null)
      ? PublicKey.fromPartial(object.system)
      : undefined;
    message.signature = object.signature ?? new Uint8Array(0);
    return message;
  },
};

function createBaseFindClaimAndVouchRequest(): FindClaimAndVouchRequest {
  return { vouchingSystem: undefined, claimingSystem: undefined, fields: [], claimType: Long.UZERO };
}

export const FindClaimAndVouchRequest = {
  encode(message: FindClaimAndVouchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vouchingSystem !== undefined) {
      PublicKey.encode(message.vouchingSystem, writer.uint32(10).fork()).ldelim();
    }
    if (message.claimingSystem !== undefined) {
      PublicKey.encode(message.claimingSystem, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.fields) {
      ClaimFieldEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.claimType.isZero()) {
      writer.uint32(32).uint64(message.claimType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindClaimAndVouchRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindClaimAndVouchRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vouchingSystem = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.claimingSystem = PublicKey.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fields.push(ClaimFieldEntry.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.claimType = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindClaimAndVouchRequest {
    return {
      vouchingSystem: isSet(object.vouchingSystem) ? PublicKey.fromJSON(object.vouchingSystem) : undefined,
      claimingSystem: isSet(object.claimingSystem) ? PublicKey.fromJSON(object.claimingSystem) : undefined,
      fields: Array.isArray(object?.fields) ? object.fields.map((e: any) => ClaimFieldEntry.fromJSON(e)) : [],
      claimType: isSet(object.claimType) ? Long.fromValue(object.claimType) : Long.UZERO,
    };
  },

  toJSON(message: FindClaimAndVouchRequest): unknown {
    const obj: any = {};
    if (message.vouchingSystem !== undefined) {
      obj.vouchingSystem = PublicKey.toJSON(message.vouchingSystem);
    }
    if (message.claimingSystem !== undefined) {
      obj.claimingSystem = PublicKey.toJSON(message.claimingSystem);
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => ClaimFieldEntry.toJSON(e));
    }
    if (!message.claimType.isZero()) {
      obj.claimType = (message.claimType || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindClaimAndVouchRequest>, I>>(base?: I): FindClaimAndVouchRequest {
    return FindClaimAndVouchRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindClaimAndVouchRequest>, I>>(object: I): FindClaimAndVouchRequest {
    const message = createBaseFindClaimAndVouchRequest();
    message.vouchingSystem = (object.vouchingSystem !== undefined && object.vouchingSystem !== null)
      ? PublicKey.fromPartial(object.vouchingSystem)
      : undefined;
    message.claimingSystem = (object.claimingSystem !== undefined && object.claimingSystem !== null)
      ? PublicKey.fromPartial(object.claimingSystem)
      : undefined;
    message.fields = object.fields?.map((e) => ClaimFieldEntry.fromPartial(e)) || [];
    message.claimType = (object.claimType !== undefined && object.claimType !== null)
      ? Long.fromValue(object.claimType)
      : Long.UZERO;
    return message;
  },
};

function createBaseFindClaimAndVouchResponse(): FindClaimAndVouchResponse {
  return { vouch: undefined, claim: undefined };
}

export const FindClaimAndVouchResponse = {
  encode(message: FindClaimAndVouchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vouch !== undefined) {
      SignedEvent.encode(message.vouch, writer.uint32(10).fork()).ldelim();
    }
    if (message.claim !== undefined) {
      SignedEvent.encode(message.claim, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindClaimAndVouchResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindClaimAndVouchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vouch = SignedEvent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.claim = SignedEvent.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindClaimAndVouchResponse {
    return {
      vouch: isSet(object.vouch) ? SignedEvent.fromJSON(object.vouch) : undefined,
      claim: isSet(object.claim) ? SignedEvent.fromJSON(object.claim) : undefined,
    };
  },

  toJSON(message: FindClaimAndVouchResponse): unknown {
    const obj: any = {};
    if (message.vouch !== undefined) {
      obj.vouch = SignedEvent.toJSON(message.vouch);
    }
    if (message.claim !== undefined) {
      obj.claim = SignedEvent.toJSON(message.claim);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindClaimAndVouchResponse>, I>>(base?: I): FindClaimAndVouchResponse {
    return FindClaimAndVouchResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindClaimAndVouchResponse>, I>>(object: I): FindClaimAndVouchResponse {
    const message = createBaseFindClaimAndVouchResponse();
    message.vouch = (object.vouch !== undefined && object.vouch !== null)
      ? SignedEvent.fromPartial(object.vouch)
      : undefined;
    message.claim = (object.claim !== undefined && object.claim !== null)
      ? SignedEvent.fromPartial(object.claim)
      : undefined;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
