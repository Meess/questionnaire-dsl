import FormState from "../../../form/state/FormState";
import { Maybe } from "../../../helpers/type_helper";

export default class PagedFormState extends FormState {
  private activePageName: Maybe<string>;

  constructor(store?: Map<string, any>, activePage?: string) {
    super(store);
    this.activePageName = activePage;
  }

  public getActivePageName(): Maybe<string> {
    return this.activePageName;
  }

  public setActivePageName(pageName: string): PagedFormState {
    return new PagedFormState(this.store, pageName);
  }

  public instantiate(newStore?: Map<string, any>): FormState {
    return new PagedFormState(newStore, this.activePageName);
  }
}