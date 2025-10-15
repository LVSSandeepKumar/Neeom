// utils/scrollAnimationObserver.ts

export function observeScrollAnimations(
  selectors: string | string[] = '.anim-fade-in, .anim-slide-up, .anim-slide-down, .anim-slide-left, .anim-slide-right, .anim-zoom-in, .anim-zoom-out, .anim-rotate-in, .anim-bounce-in',
  options: IntersectionObserverInit = { threshold: 0.2 },
  animationClass = 'in-view'
): { observer: IntersectionObserver; disconnect: () => void } {
  const selectorList = typeof selectors === 'string' ? [selectors] : selectors;

  // Set to track observed elements so we don't observe duplicates
  const observedElements = new Set<Element>();

  // Create IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      } else {
        entry.target.classList.remove(animationClass);
      }
    });
  }, options);

  // Function to observe all elements currently in DOM matching selectors
  const observeAllElements = () => {
    selectorList.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    });
  };

  // Observe existing elements initially
  observeAllElements();

  // Setup MutationObserver to watch for added nodes dynamically
  const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        selectorList.forEach(sel => {
          if (node.matches(sel) && !observedElements.has(node)) {
            observer.observe(node);
            observedElements.add(node);
          }
          // Also check descendants matching selector (if node is a container)
          node.querySelectorAll(sel).forEach(descendant => {
            if (!observedElements.has(descendant)) {
              observer.observe(descendant);
              observedElements.add(descendant);
            }
          });
        });
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // Return both observers and a disconnect method to cleanup
  return {
    observer,
    disconnect: () => {
      observer.disconnect();
      mutationObserver.disconnect();
    },
  };
}
