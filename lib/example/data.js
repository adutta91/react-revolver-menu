export const exampleData = {
  items : [
    {
      type   : 'icon',
      faIcon : 'fa fa-user-circle-o fa-3x',
      items : [{
        type  : 'text',
        text  : '4',
        items : [],
      },
      {
        type    : 'text',
        text    : '5',
        items   : [],
        onClick : () => { window.alert('yay!!! you found ze treasure!!!'); }
      },
      {
        type  : 'text',
        text  : '6',
        items : [],
      }],
    },
    {
      type    : 'icon',
      faIcon  : 'fa fa-question-circle-o fa-3x',
      items   : [],
      onClick : () => { window.alert('yay!!! you found ze treasure!!!'); }
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-book fa-3x',
      items  : [],
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-bell fa-3x',
      items  : [],
    },
    {
      type   : 'icon',
      faIcon : 'fa fa-binoculars fa-3x',
      items  : [],
    },
  ]
};
