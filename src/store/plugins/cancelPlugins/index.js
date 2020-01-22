import { cloneDeep } from "lodash";
import history from "./History";

const ignoreMutation = [
  "core/set_objectName",
  "core/toggle_isLongDown",
  "core/clear_template",
  "core/updatePos",
  "core/updateZoom"
];

export default function cancelPlugins(store) {
  history.init(store);
  store.subscribe((mutation, state) => {
    if (!ignoreMutation.includes(mutation.type)) {
      history.addState(cloneDeep(state));
    }
  });
}
