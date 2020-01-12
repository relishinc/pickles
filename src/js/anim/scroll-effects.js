import { isInViewport, debounce } from '../utils/utils';
import ScrollListener from '../utils/scroll-listener';

export default class ScrollEffects {
	
  constructor($options = {}) {
    // settings

    let defaults = {
        selector: '[data-scroll], [data-scroll-from], [data-scroll-to]',
    };
		this.options = Object.assign({}, defaults, $options);
		
		// vars

		this.namespace = 'scrollEffects';		    
		this.items = [];

		// create timelines
		
		$(this.options.selector)
			.each((index, el) => 
			{
				//<div 
				//	data-scroll-from='{ "y": 100, "opacity": 0 }'	 // the properties to animate (starting values)
				// 	data-scroll-start="0"														// when to start animation [ 0 = when element STARTS to enter viewport ]
				//	data-scroll-end="1"															// when to stop animation [ 1 = when element STARTS to leave viewport ]
				// 	data-scroll-exit="true"													// calculate "end" based on when element completely LEAVES viewport
				//>
				
				try {

					let 
						tl = new TimelineLite({ paused: true }),
						props = $(el).data('scroll-to') || $(el).data('scroll') || $(el).data('scroll-from') || {},
						method = $(el).data('scroll-to') ? 'to' : 'from';

					// clear out any old inline styles
					for ( var prop in props )
					{
						el.style[prop] = null;
					}
						
					tl[method]($(el), 1, props);
					
					//$(el).css({ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' })
					
					this.items.push({ el, tl });					
				}
				catch(e) {
					console.log('Could not animate on scroll:', e);
				}					

      });	
      
		new ScrollListener(() => this.onScroll(), true);	
		
		$(window)
			.on(`resize.${this.namespace}`, debounce( e => this.onScroll(), 250 ));

	}
  
  onScroll() {
    let
      wh = $(window).height(),
      st = $(window).scrollTop();

    $.each(this.items, (index, item) =>
    {
      if ( ! isInViewport(item.el) ) return;

      let
        et = $(item.el).offset().top,
        eh = $(item.el).outerHeight(),
        
        end = $.isNumeric($(item.el).data('scroll-end')) ? $(item.el).data('scroll-end') : 1,
        start = $.isNumeric($(item.el).data('scroll-start')) ? $(item.el).data('scroll-start') : 0,
        
        enter = et + wh * ( start - 1 ),		// when element enters "start" point
        exit = $(item.el).data('scroll-exit') ?	// when element leaves "end" point 
          ( et + eh + wh * ( end - 1 ) ) :	// element completely leaves viewport
          ( et + wh * ( end - 1 ) );				// element starts to leave viewport
        
      let progress = Math.max( 0, Math.min( 1, ( st - enter ) / ( exit - enter ) ) );

      item.tl.progress(progress);					
    });
  };

}