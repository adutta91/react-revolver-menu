export const exampleData = {
  animateDelay : 10,
  diameter     : 10,
  border       : 'dashed',
  items        : [
    {
      type   : 'icon',
      faIcon : 'fa fa-user-circle-o fa-3x',
      key    : 0,
      items : [{
        type  : 'text',
        text  : '4',
        key   : 5,
        items : [],
      },
      {
        type    : 'text',
        text    : '5',
        key     : 6,
        items   : [],
        onClick : () => { window.alert('yay!!! you found ze treasure!!!'); }
      },
      {
        type  : 'text',
        text  : '6',
        key   : 7,
        items : [],
      }],
    },
    {
      type    : 'icon',
      faIcon  : 'fa fa-question-circle-o fa-3x',
      key     : 1,
      items   : [],
      onClick : () => { window.alert('yay!!! you found ze treasure!!!'); }
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-book fa-3x',
      key    : 2,
      items  : [],
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-bell fa-3x',
      key    : 3,
      items  : [],
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-binoculars fa-3x',
      key    : 4,
      items  : [],
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-beer fa-3x',
      key    : 8,
      items  : [],
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-car fa-3x',
      key    : 9,
      items  : [],
    },
  ]
};
