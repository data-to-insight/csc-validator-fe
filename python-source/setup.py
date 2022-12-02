from setuptools import setup, find_packages

VERSION = '0.0.1' 
DESCRIPTION = 'SFDL Sample Pyodide'
LONG_DESCRIPTION = 'SFDL Sample Pyodide'

# Setting up
setup(
       # the name must match the folder name 'verysimplemodule'
        name="main", 
        version=VERSION,
        author="Dave Tickle",
        author_email="dave.tickle@socialfinance.org.uk",
        description=DESCRIPTION,
        long_description=LONG_DESCRIPTION,
        packages=find_packages(),
        install_requires=[], # add any additional packages that 
        # needs to be installed along with your package. Eg: 'caer'
        
        keywords=['python', 'first package'],
        classifiers= [
            "Development Status :: 3 - Alpha",
            "Intended Audience :: Education",
            "Programming Language :: Python :: 2",
            "Programming Language :: Python :: 3",
            "Operating System :: MacOS :: MacOS X",
            "Operating System :: Microsoft :: Windows",
        ]
)
