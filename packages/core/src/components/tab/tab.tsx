import { Component, Element, Event, EventEmitter, Method, Prop, PropDidChange, State } from '@stencil/core';


@Component({
  tag: 'ion-tab',
})
export class Tab {

  @Element() el: HTMLElement;

  @State() init = false;
  @State() active = false;

  /**
   * @input {string} Set the root page for this tab.
   */
  @Prop() btnId: string;

  /**
   * @input {string} The URL path name to represent this tab within the URL.
   */
  @Prop() path: string;

  /**
   * @input {string} The title of the tab button.
   */
  @Prop() title: string;

  /**
   * @input {string} The icon for the tab button.
   */
  @Prop() icon: string;

  /**
   * @input {string} The badge for the tab button.
   */
  @Prop() badge: string;

  /**
   * @input {string} The badge color for the tab button.
   */
  @Prop() badgeStyle: string = 'default';

  /**
   * @input {boolean} If true, enable the tab. If false,
   * the user cannot interact with this element.
   * Default: `true`.
   */
  @Prop() enabled = true;

  /**
   * @input {boolean} If true, the tab button is visible within the
   * tabbar. Default: `true`.
   */
  @Prop() show = true;

  /**
   * @input {boolean} If true, hide the tabs on child pages.
   */
  @Prop() tabsHideOnSubPages = false;


  @Prop({ mutable: true }) selected = false;
  @PropDidChange('selected')
  selectedChanged(selected: boolean) {
    if (selected) {
      this.ionSelect.emit();
    }
  }

  /**
   * @output {Tab} Emitted when the current tab is selected.
   */
  @Event() ionSelect: EventEmitter<TabEventDetail>;

  @Method()
  setActive(active: boolean): Promise<any> {
    this.active = active;
    return Promise.resolve();
  }

  @Method()
  getPath(): string {
    if (this.path != null) {
      return this.path;
    }
    if (this.title) {
      return this.title.toLowerCase();
    }
    return '';
  }

  hostData() {
    const visible = this.active && this.selected;
    return {
      'aria-hidden': !visible ? 'true' : null,
      'aria-labelledby': this.btnId,
      'role': 'tabpanel',
      class: {
        'show-tab': this.active
      }
    };
  }

  render() {
    return <slot></slot>;
  }
}

export interface TabEvent extends CustomEvent {
  detail: TabEventDetail;
}

export interface TabEventDetail {

}
