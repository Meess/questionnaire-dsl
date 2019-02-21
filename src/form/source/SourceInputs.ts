import SourceText from "./SourceText";

export default class SourceInputs {
  private qlSource: SourceText;
  private qlsSource: SourceText;
  private qlsEnabled: boolean;

  constructor(qlSource: SourceText, qlsSource: SourceText, qlsEnabled: boolean) {
    this.qlSource = qlSource;
    this.qlsSource = qlsSource;
    this.qlsEnabled = qlsEnabled;
  }

  getQlSource(): SourceText {
    return this.qlSource;
  }

  getQlsSource() {
    return this.qlsSource;
  }

  qlsIsFilledAndEnabled() {
    return this.qlsEnabled && !this.qlsSource.isEmpty();
  }

  qlsIsEnabled() {
    return this.qlsEnabled;
  }

  static makeFromStrings(qlSource: string, qlsSource: string, qlsEnabled: boolean): SourceInputs {
    return new SourceInputs(new SourceText(qlSource), new SourceText(qlsSource), qlsEnabled);
  }
}