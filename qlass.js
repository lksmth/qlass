var qlass = (function() {
	return function() {
		function qlass(arr) {
			var al = arr.length - 1, c = 0, context = typeof window !== "undefined" ? window : this;
			while(c < al) { context = (context[arr[c]] = context[arr[c]] || {}); c++; }
			return context;
		}
		var args = [].slice.call(arguments, 0),
			splitName = args.shift().split(/\s*:\s*/),
			classNamespace = splitName[0].split(/\./),
			inheritNamespace = splitName[1] && splitName[1].split(/\./) || [],
			className = classNamespace[classNamespace.length-1],
			inheritName = inheritNamespace[inheritNamespace.length-1],
			def = args.shift() || {},
			inherit = qlass(inheritNamespace)[inheritName],
			q = qlass(classNamespace)[className] = function(k) {
				if(k != qlass && def[className]) def[className].apply(this, arguments);
			};
		q.prototype = function() {
			var o = inherit && new inherit(qlass) || {
				base: function() { return arguments.callee.caller._.apply(this, arguments); }
			};
			for(var d in def) {
				if(def.hasOwnProperty(d)) {
					var f = def[d],	name = d === className ? "constructor" : d;
					if(inherit) f._ = inherit.prototype[name];
					o[name] = f;
				}
			}
			return o;
		}();
	};
})();

typeof module !== 'undefined' && (module.exports = qlass);