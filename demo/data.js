export const exampleData = {
  animateDelay : 10,
  diameter     : 10,
  border       : 'dashed',
  animateStyle : 'radiate',
  items        : [
    {
      type            : 'icon',
      icon            : 'fa fa-user-circle-o fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items           : [
        {
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
          items : [
            {
              type  : 'text',
              text  : '7',
              items : [],
            },
            {
              type    : 'text',
              text    : '8',
              items   : [],
              onClick : () => { window.alert('yay!!! you found ze treasure!!!'); }
            },
            {
              type  : 'text',
              text  : '9',
              items : [],
            },
            {
              type  : 'text',
              text  : '10',
              items : [],
            },
            {
              type  : 'text',
              text  : '11',
              items : [],
            }
          ],
        }
      ],
    },
    {
      type  : 'icon',
      icon  : 'fa fa-question-circle-o fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items : [],
      onClick : () => { window.alert('yay!!! you found ze treasure!!!'); }
    },
    {
      type  : 'icon',
      icon  : 'fa fa-book fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items : [],
    },
    {
      type  : 'icon',
      icon  : 'fa fa-bell fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items : [],
    },
    {
      type  : 'icon',
      icon  : 'fa fa-binoculars fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items : [],
    },
    {
      type  : 'icon',
      icon  : 'fa fa-beer fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items : [],
    },
    {
      type  : 'icon',
      icon  : 'fa fa-car fa-3x',
      popover         : 'test',
      popoverPosition : 'bottom',
      items : [],
    },
  ]
};
