import { DATA_TYPE } from "jsstore"

const tblPlugins = {
  name: 'Plugins',
  columns: {
    id: { primaryKey: true, dataType: DATA_TYPE.String },
    configuration: { notNull: true, dataType: DATA_TYPE.Object },
    script: { notNull: true, dataType: DATA_TYPE.Object },
    icon: { notNull: true, dataType: DATA_TYPE.String }
  }
}

const tblSettings = {
  name: 'Settings',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    pluginSettings: { dataType: DATA_TYPE.Object },
    pluginSortOrder: { dataType: DATA_TYPE.Array }
  }
}

export default {
  name: 'PurpleJay',
  tables: [tblPlugins, tblSettings]
}
